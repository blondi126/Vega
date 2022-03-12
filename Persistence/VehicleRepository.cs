using Microsoft.EntityFrameworkCore;
using Vega.Models;

namespace Vega.Persistence
{
    public class VehicleRepository: IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }
        public async Task<Vehicle?> GetVehicle(int id)
        {
            var result = await _context.Vehicles!
                .Include(v => v.Features)
                .Include(v => v.Model)
                    .ThenInclude( m => m!.Make)
                .SingleOrDefaultAsync( v => v.Id == id);

            return result;
        }
    }
}