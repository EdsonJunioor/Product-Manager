using ProductManagerAPI.DbContextConfig;
using ProductManagerAPI.DbService;
using ProductManagerAPI.Interfaces;
using ProductManagerAPI.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add MongoDB Context with EF Core
builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddSingleton<MongoDBService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();


var app = builder.Build();

app.UseCors("AllowAll");
app.MapGet("/", () => "API com MongoDB Atlas está rodando!");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
