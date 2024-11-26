
using Swapi.Models;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

builder.Services.AddCors();

builder.Services.AddDbContext<StarWarsContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .EnableSensitiveDataLogging();
    }

    );

var app = builder.Build();

// ensure that the db is created and seeded 
using (var scope =
  app.Services.CreateScope())
    using (var context = scope.ServiceProvider.GetService<StarWarsContext>())
        context?.Database.EnsureCreated();

app.UseHttpsRedirection();

// leave the CORS wide open, in prod this would need to change
app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapGet("/", (StarWarsContext db) =>
        db.Starships.ToList()
    )
    .WithName("GetStarShips").WithOpenApi();

app.MapGet("/{id}", (int id, StarWarsContext db) =>
{
    Starship? starship = db.Starships.Find(id);

    return starship;
});

app.MapGet("/random", (StarWarsContext db) =>
        db.Starships.OrderBy((ss) => Guid.NewGuid()).First()
    )
    .WithName("GetRandomStarShip").WithOpenApi();



app.Run();

