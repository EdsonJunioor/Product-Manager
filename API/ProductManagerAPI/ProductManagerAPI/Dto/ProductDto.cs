using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProductManagerAPI.Dto
{
    public class ProductDto
    {
        public string Id { get; set; }

        public string CategoryId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string ExpirationDate { get; set; }

        public string Batch { get; set; }

        public int? StockQuantity { get; set; }

        public bool IsDeleted { get; set; } = false;
    }
}
