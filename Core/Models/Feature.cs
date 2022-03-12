using System.ComponentModel.DataAnnotations;

namespace Vega.Core.Models
{
    public class Feature
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string? Name { get; set; }

        public List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    }
}