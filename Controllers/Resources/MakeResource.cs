using System.Collections.ObjectModel;

namespace Vega.Controllers.Resources
{
    public class MakeResource: IdNamePairResource
    {
        public ICollection<IdNamePairResource> Models {get; set;}

        public MakeResource()
        {
            Models = new Collection<IdNamePairResource>();
        }
    }
}