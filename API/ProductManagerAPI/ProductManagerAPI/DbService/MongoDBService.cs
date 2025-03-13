using MongoDB.Driver;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.DbService
{
    public class MongoDBService
    {
        private readonly IMongoDatabase _database;

        public MongoDBService(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDB");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("ProductManagerDB");
        }

        public Task<IMongoCollection<Product>> GetProductsCollectionAsync()
        {
            return Task.FromResult(_database.GetCollection<Product>("Products"));
        }

        public Task<IMongoCollection<Category>> GetCategoriesCollectionAsync()
        {
            return Task.FromResult(_database.GetCollection<Category>("Categories"));
        }
    }
}
