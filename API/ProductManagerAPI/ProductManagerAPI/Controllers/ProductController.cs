using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using ProductManagerAPI.DbContextConfig;
using ProductManagerAPI.Interfaces;
using ProductManagerAPI.Models;

namespace ProductManagerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost("create")]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            var createdProduct = await _productRepository.CreateAsync(product);
            return CreatedAtAction(nameof(Create), new { id = createdProduct.Id }, createdProduct);
        }


        [HttpGet("getAll")]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var products = await _productRepository.GetAllAsync();
            return Ok(products);
        }

        [HttpGet]
        public async Task<ActionResult<Product>> GetProductById(string id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpGet("productByCategory")]
        public async Task<ActionResult<List<Product>>> GetProductByCategory(string id)
        {
            var products = await _productRepository.GetAllAsync();
            var product = products.Where(a => a.CategoryId.Contains(id));
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPut]
        public async Task<IActionResult> Update(string id, Product product)
        {
            var updated = await _productRepository.UpdateAsync(id, product);
            return updated ? NoContent() : NotFound();
        }


        [HttpPost("delete")]
        public async Task<IActionResult> SoftDelete(string id)
        {
            var deleted = await _productRepository.SoftDeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _productRepository.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
