using ProductManagerAPI.Models;

namespace ProductManagerAPI.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> CreateAsync(Product product);
        Task<List<Product>> GetAllAsync();
        Task<Product?> GetByIdAsync(string id);
        Task<bool> UpdateAsync(string id, Product product);
        Task<bool> SoftDeleteAsync(string id);
        Task<bool> DeleteAsync(string id);
    }
}
