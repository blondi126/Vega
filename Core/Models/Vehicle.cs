using System.Collections.ObjectModel;

namespace Vega.Core.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model? Model {get; set;}
        public bool IsRegistered { get; set; }
        public Contact? Contact {get; set;}
        public DateTime LastUpdate { get; set; }
        public ICollection<Feature> Features { get; set; }

        public Vehicle()
        {
            Features = new Collection<Feature>();
        }
    }
}