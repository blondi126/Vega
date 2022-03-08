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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=VegaDataBase;Trusted_Connection=True");
        }
    }
