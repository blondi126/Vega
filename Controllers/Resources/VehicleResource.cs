using System.Collections.ObjectModel;
using Vega.Models;

namespace Vega.Controllers.Resources
{
    public class VehicleResource
    {
         public int Id { get; set; }
        public IdNamePairResource? Model {get; set;}
        public IdNamePairResource? Make { get; set; }
        public bool IsRegistered { get; set; }
        public ContactResource? Contact {get; set;}
        public DateTime LastUpdate { get; set; }
        public ICollection<IdNamePairResource> Features { get; set; }

        public VehicleResource()
        {
            Features = new Collection<IdNamePairResource>();
        }
    }
}