using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Vega.Core;
using Vega.Core.Models;
using Vega.Extensions;

namespace Vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            var query = _context.Vehicles!
                .Include(v => v.Model)
                    .ThenInclude(m => m!.Make)
                .Include(v => v.Features)
                .AsQueryable();


             if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model!.MakeId == queryObj.MakeId);
            
            if (queryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == queryObj.ModelId);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model!.Make!.Name!,
                ["model"] = v => v.Model!.Name!,
                ["contactName"] = v => v.Contact!.Name!,
            };

            query = query.ApplyOrdering(queryObj,columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }

        public async Task<Vehicle?> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Vehicles!.FindAsync(id);

            return await _context.Vehicles!
                .Include(v => v.Features)
                .Include(v => v.Model)
                    .ThenInclude(m => m!.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public async Task<Model?> GetModelAsync(int id)
        {
            return await _context.Models!.Include(m => m.Make).SingleOrDefaultAsync(m => m.Id == id);
        }
        public async Task<List<Make>> GetMakesAsync()
        {
            return await _context.Makes!.Include(c => c.Models).ToListAsync();

        }

        public async Task<List<Feature>> GetFeaturesAsync(ICollection<int>? featuresResource = null)
        {
            if (featuresResource == null)
                return await _context.Features!.ToListAsync();

            return await _context.Features!.Where(f => featuresResource.Contains(f.Id)).ToListAsync();
        }

        public async void AddAsync(Vehicle vehicle)
        {
            await _context.Vehicles!.AddAsync(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Vehicles!.Remove(vehicle);
        }
    }
}