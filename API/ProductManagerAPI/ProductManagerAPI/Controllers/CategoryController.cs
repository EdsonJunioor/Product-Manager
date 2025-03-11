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
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpPost]
        public async Task<ActionResult<Category>> Create(Category category)
        {
            var createdCategory = await _categoryRepository.CreateAsync(category);
            return CreatedAtAction(nameof(Create), new { id = createdCategory.Id }, createdCategory);

        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<Category>>> GetAll()
        {
            var categories = await _categoryRepository.GetAllAsync();
            return Ok(categories);
        }

        [HttpGet]
        public async Task<ActionResult<Category>> Get(string id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            return category == null ? NotFound() : Ok(category);
        }

        [HttpPut]
        public async Task<IActionResult> Update(string id, Category category)
        {
            var updated = await _categoryRepository.UpdateAsync(id, category);
            return updated ? NoContent() : NotFound();
        }

        [HttpPost("delete")]
        public async Task<IActionResult> SoftDelete(string id)
        {
            var deleted = await _categoryRepository.SoftDeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            var deleted = await _categoryRepository.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }

    }
}
