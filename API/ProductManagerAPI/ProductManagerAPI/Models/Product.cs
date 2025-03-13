using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductManagerAPI.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("CategoryId")]
        public string CategoryId { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("Price")]
        public decimal Price { get; set; }

        [BsonElement("ExpirationDate")]
        public string ExpirationDate { get; set; }

        [BsonElement("Batch")]
        public string Batch { get; set; }

        [BsonElement("StockQuantity")]
        public int? StockQuantity { get; set; }

        [BsonElement("IsDeleted")]
        public bool IsDeleted { get; set; } = false;

    }
}
