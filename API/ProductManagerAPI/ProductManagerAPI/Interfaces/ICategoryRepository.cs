using ProductManagerAPI.Dto;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Interfaces
{
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);
        Task<List<CategoryDto>> GetAllAsync();
        Task<Category?> GetByIdAsync(string id);
        Task<bool> UpdateAsync(string id, Category category);
        Task<bool> SoftDeleteAsync(string id);
        Task<bool> DeleteAsync(string id);
    }
}
