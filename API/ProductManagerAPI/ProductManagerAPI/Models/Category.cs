using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductManagerAPI.Models
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; } = string.Empty;

        [BsonElement("IsDeleted")]
        public bool IsDeleted { get; set; } = false;
    }
}
