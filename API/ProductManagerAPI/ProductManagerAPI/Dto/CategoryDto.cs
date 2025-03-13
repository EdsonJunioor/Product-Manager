using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ProductManagerAPI.Dto
{
    public class CategoryDto
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsDeleted { get; set; } = false;
    }
}
