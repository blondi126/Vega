using Microsoft.EntityFrameworkCore;
using Vega.Models;

namespace Vega.Persistence;
    public class VegaDbContext:DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            :base(options)
        {
        }

        public DbSet<Make>? Makes { get; set; }
    }
