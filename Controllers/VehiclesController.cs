using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vega.Controllers.Resources;
using Vega.Core.Models;
using Vega.Core;
using Microsoft.AspNetCore.Authorization;

namespace Vega.Controllers
{
    [Route("/api/vehicles/")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
    
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            vehicle.Model = await _repository.GetModelAsync(vehicle.ModelId);

            var features = await _repository.GetFeaturesAsync(vehicleResource.Features);

            foreach (var f in features)
                vehicle.Features.Add(f);

            _repository.AddAsync(vehicle);

            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicleAsync(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle!);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> ReadVehicles(FilterQueryResource filterResource)
        {
            var filter = _mapper.Map<FilterQueryResource, VehicleQuery>(filterResource);
            var queryResult = await _repository.GetVehiclesAsync(filter);

            if (queryResult == null)
                return NotFound("Vehicles not found");

            var vehiclesResource = _mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);

            return Ok(vehiclesResource);
        }

        [HttpGet("/api/vehicles/{id}")]
        [Authorize]
        public async Task<IActionResult> ReadVehicle(int id)
        {
            var vehicle = await _repository.GetVehicleAsync(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await _repository.GetVehicleAsync(id);

            if (vehicle == null)
                return NotFound();

            _mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            var features = await _repository.GetFeaturesAsync(vehicleResource.Features);

            var addedFeatures = features.Where(f => !vehicle.Features.Contains(f));
            var removedFeatures = vehicle.Features.Where(f => !vehicleResource.Features.Contains(f.Id));

            foreach (var f in addedFeatures)
                vehicle.Features.Add(f);

            foreach (var f in removedFeatures.ToList())
                vehicle.Features.Remove(f);

            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicleAsync(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle!);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _repository.GetVehicleAsync(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            _repository.Remove(vehicle);

            await _unitOfWork.CompleteAsync();

            return Ok();
        }
    }
}