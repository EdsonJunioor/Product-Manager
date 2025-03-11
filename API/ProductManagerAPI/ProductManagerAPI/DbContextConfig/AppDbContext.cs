using Microsoft.EntityFrameworkCore;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.DbContextConfig
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMongoDB("mongodb://localhost:27017", "ProductManagerDB");
            }
        }

    }
}
