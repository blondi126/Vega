using Vega.Models;

namespace Vega.Persistence
{
    public interface IVehicleRepository
    {
        Task<Vehicle?> GetVehicle(int id);
    }
}