using ProductManagerAPI.Dto;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Interfaces
{
    public interface IProductRepository
    {
        Task<Product> CreateAsync(Product product);
        Task<List<ProductDto>> GetAllAsync();
        Task<List<ProductDto>> GetByCategoryIdAsync(string categoryId);
        Task<bool> UpdateAsync(string id, Product product);
        Task<bool> SoftDeleteAsync(string id);
        Task<bool> DeleteAsync(string id);
    }
}
