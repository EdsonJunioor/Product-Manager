using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using ProductManagerAPI.DbService;
using ProductManagerAPI.Dto;
using ProductManagerAPI.Interfaces;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MongoDBService _mongoDBService;

        public CategoryRepository(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            var categoriesCollection = await _mongoDBService.GetCategoriesCollectionAsync();
            await categoriesCollection.InsertOneAsync(category);

            return category;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            var categoriesCollection = await _mongoDBService.GetCategoriesCollectionAsync();
            var categories = await categoriesCollection.Find(x => !x.IsDeleted).ToListAsync();

            var categoryList = categories.Select(product => new CategoryDto
            {
                Id = product.Id.ToString(),
                Name = product.Name,
                IsDeleted = product.IsDeleted
            }).ToList();

            return categoryList;
        }

        public async Task<Category?> GetByIdAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
            {
                return null;
            }
            var categoriesCollection = await _mongoDBService.GetCategoriesCollectionAsync();
            var category = await categoriesCollection.Find(x => x.Id == objectId).FirstOrDefaultAsync();

            return category;
        }

        public async Task<bool> UpdateAsync(string id, Category category)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var productsCollection = await _mongoDBService.GetCategoriesCollectionAsync();

            var updateDefinition = Builders<Category>.Update
                .Set(p => p.Name, category.Name);

            var updateResult = await productsCollection.UpdateOneAsync(
                p => p.Id == objectId,
                updateDefinition
            );

            return true;
        }

        public async Task<bool> SoftDeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var productsCollection = await _mongoDBService.GetCategoriesCollectionAsync();

            var updateDefinition = Builders<Category>.Update
                .Set(p => p.IsDeleted, true);

            var updateResult = await productsCollection.UpdateOneAsync(
                p => p.Id == objectId,
                updateDefinition
            );

            return true;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var productsCollection = await _mongoDBService.GetCategoriesCollectionAsync();
            var result = await productsCollection.DeleteOneAsync(p => p.Id == objectId);

            return true;
        }
    }
}
