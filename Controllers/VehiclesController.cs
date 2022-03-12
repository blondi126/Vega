using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly VegaDbContext _context;
        private readonly IMapper _mapper;

         public VehiclesController(VegaDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            var features = _context.Features.Where(f => vehicleResource.Features.Contains(f.Id));
            foreach (var f in features)
                vehicle.Features.Add(f);
                    
            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();
            
            var result = _mapper.Map<Vehicle, SaveVehicleResource>(vehicle);

            return Ok(result);
        }
        
        [HttpGet]
        public IActionResult ReadVehicles()
        {
            var vehicles = _context.Vehicles.Include(v => v.Features).ToList();

            if (vehicles == null)
                return NotFound("Vehicles not found");

            var vehiclesResource = _mapper.Map<List<Vehicle>, List<VehicleResource>>(vehicles);

            return Ok(vehiclesResource);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ReadVehicle(int id)
        {
            var vehicle = await _context.Vehicles
                .Include(v => v.Features)
                .Include(v => v.Model)
                    .ThenInclude( m => m.Make)
                .SingleOrDefaultAsync( v => v.Id == id);

            if (vehicle == null)
                return NotFound();
            
            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var vehicle = await _context.Vehicles.Include( v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;
           // vehicle.Id = id;

            var features = _context.Features.Where(f => vehicleResource.Features.Contains(f.Id));
            var addedFeatures = features.Where(f => !vehicle.Features.Contains(f));
            var removedFeatures = vehicle.Features.Where(f => !vehicleResource.Features.Contains(f.Id));

            foreach (var f in addedFeatures)
                vehicle.Features.Add(f);
            
            foreach (var f in removedFeatures.ToList())
                vehicle.Features.Remove(f);
            
            await _context.SaveChangesAsync();
            
            var result = _mapper.Map<Vehicle, SaveVehicleResource>(vehicle);

            return Ok(result);
        }

         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id) 
        { 
            var vehicle = await _context.Vehicles.FindAsync(id);
            
            if (vehicle == null)
                return NotFound();

            _context.Remove(vehicle);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}