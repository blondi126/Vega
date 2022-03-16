using Microsoft.EntityFrameworkCore;
using Vega.Core.Models;

namespace Vega.Persistence;
    public class VegaDbContext:DbContext
    {

        public DbSet<Make>? Makes { get; set; }
        public DbSet<Feature>? Features {get; set;}
        public DbSet<Vehicle>? Vehicles { get; set; }
        public DbSet<Model>? Models { get; set; }
        public DbSet<Photo>? Photos {get; set;}

        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            :base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=VegaDataBase;Trusted_Connection=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Vehicle>()
                .HasMany(c => c.Features)
                .WithMany(s => s.Vehicles)
                .UsingEntity(j => j.ToTable("VehicleFeatures"));
    }
    }
