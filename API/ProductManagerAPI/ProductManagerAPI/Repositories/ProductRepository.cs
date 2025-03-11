using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using ProductManagerAPI.DbContextConfig;
using ProductManagerAPI.Interfaces;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Product> CreateAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.Where(a => !a.IsDeleted).ToListAsync();
        }

        public async Task<Product?> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return null;

            return await _context.Products.FindAsync(objectId);
        }

        public async Task<bool> UpdateAsync(string id, Product product)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var existingProduct = await _context.Products.FindAsync(objectId);
            if (existingProduct == null)
                return false;

            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.CategoryId = product.CategoryId;
            existingProduct.StockQuantity = product.StockQuantity;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var existingProduct = await _context.Products.FindAsync(objectId);
            if (existingProduct == null)
                return false;

            existingProduct.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var product = await _context.Products.FindAsync(objectId);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
