using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using ProductManagerAPI.DbContextConfig;
using ProductManagerAPI.DbService;
using ProductManagerAPI.Dto;
using ProductManagerAPI.Interfaces;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly MongoDBService _mongoDBService;

        public ProductRepository(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        public async Task<Product> CreateAsync(Product product)
        {
            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();
            await productsCollection.InsertOneAsync(product);

            return product;
        }

        public async Task<List<ProductDto>> GetAllAsync()
        {
            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();
            var products = await productsCollection.Find(x => !x.IsDeleted).ToListAsync();

            var listProduct = products.Select(product => new ProductDto
            {
                Id = product.Id.ToString(),
                CategoryId = product.CategoryId,
                Name = product.Name,
                Price = product.Price,
                ExpirationDate = product.ExpirationDate,
                Batch = product.Batch,
                StockQuantity = product.StockQuantity,
                IsDeleted = product.IsDeleted
            }).ToList();

            return listProduct;
        }

        public async Task<bool> UpdateAsync(string id, Product product)
        {
            if (!ObjectId.TryParse(id, out ObjectId objectId))
                return false;

            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();

            var updateDefinition = Builders<Product>.Update
                .Set(p => p.Name, product.Name)
                .Set(p => p.Price, product.Price)
                .Set(p => p.CategoryId, product.CategoryId)
                .Set(p => p.StockQuantity, product.StockQuantity)
                .Set(p => p.Batch, product.Batch)
                .Set(p => p.ExpirationDate, product.ExpirationDate);

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

            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();

            var updateDefinition = Builders<Product>.Update
                .Set(p => p.IsDeleted,true);

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
            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();
            var result = await productsCollection.DeleteOneAsync(p => p.Id == objectId);

            return true;
        }

        public async Task<List<ProductDto>> GetByCategoryIdAsync(string categoryId)
        {
            var productsCollection = await _mongoDBService.GetProductsCollectionAsync();
            var products = await productsCollection.Find(p => p.CategoryId == categoryId && !p.IsDeleted).ToListAsync();

            var listProduct = products.Select(product => new ProductDto
            {
                Id = product.Id.ToString(),
                CategoryId = product.CategoryId,
                Name = product.Name,
                Price = product.Price,
                ExpirationDate = product.ExpirationDate,
                Batch = product.Batch,
                StockQuantity = product.StockQuantity,
                IsDeleted = product.IsDeleted
            }).ToList();

            return listProduct;
        }
    }
}
