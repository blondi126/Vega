using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Vega.Core.Models
{
    [Owned]
    public class Contact
    {
        [Required]
        [StringLength(255)]
        public string? Name { get; set; }

        [StringLength(255)]
        public string? Email { get; set; }

        [Required]
        [StringLength(255)]
        public string? Phone { get; set; }
    }
}