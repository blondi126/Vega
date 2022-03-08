using System.Collections.ObjectModel;
using Vega.Models;

namespace Vega.Controllers.Resources
{
    public class MakeResource
    {
        public int Id { get; set; }

        public string? Name { get; set; }
        public ICollection<ModelResouce> Models {get; set;}

        public MakeResource()
        {
            Models = new Collection<ModelResouce>();
        }
    }
}