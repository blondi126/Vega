using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery filter);
        Task<Vehicle?> GetVehicleAsync(int id, bool includeRelated = true);
        Task<Model?> GetModelAsync(int id);
        Task<List<Make>> GetMakesAsync();
        Task<List<Feature>> GetFeaturesAsync(ICollection<int>? featuresResource = null);
        void AddAsync(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}