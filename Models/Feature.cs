using System.ComponentModel.DataAnnotations;

namespace Vega.Models
{
    public class Feature
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string? Name { get; set; }
    }
}