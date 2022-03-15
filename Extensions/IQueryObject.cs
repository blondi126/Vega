namespace Vega.Extensions
{
    public interface IQueryObject
    {
        string SortBy {get; set;}
        bool IsSortAscending {get; set;}
        public int Page { get; set; }
        public byte PageSize { get; set; }
    }
}