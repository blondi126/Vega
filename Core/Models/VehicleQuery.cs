using Vega.Extensions;

namespace Vega.Core.Models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string SortBy {get; set;} = string.Empty;
        public bool IsSortAscending {get; set;}
        public int Page { get; set; }
        public byte PageSize { get; set; }
    }
}