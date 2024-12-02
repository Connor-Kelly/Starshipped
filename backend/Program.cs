
using Swapi.Models;
using Microsoft.EntityFrameworkCore;

using System.Text.Json;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
// builder.Services.AddAuthentication();


builder.Services.AddDbContext<StarWarsContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
    .EnableSensitiveDataLogging();
});

var app = builder.Build();

// ensure that the db is created and seeded 
using (var scope =
  app.Services.CreateScope())
using (var context = scope.ServiceProvider.GetService<StarWarsContext>())
    if (context.Database.GetPendingMigrations().Any())
    {
        // Attempt to Migrate the DB, When all is being scaffolded at the same 
        // time, this has a tendancy to fail, It'll still connect...
        try
        {
            context.Database.Migrate();
        }
        catch (Exception sqlException)
        {
            Console.WriteLine(sqlException);
        }
    }


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

app.MapDelete("/{id}", (int id, StarWarsContext db) =>
{
    Starship? starship = db.Starships.Find(id);
    db.Remove(starship);
    db.SaveChanges();

    return "Successfully Deleted";
});

app.MapPost("/{id}", (int id, [FromBody] Starship ss, StarWarsContext db) =>
{
    Starship? starship = db.Starships.Find(id);


    Console.WriteLine("SS: ");
    Console.WriteLine(JsonSerializer.Serialize(ss));

    if (starship == null)
    {
        return "Could not find Starship with that ID.";
    }

    starship.name = ss.name;
    starship.Model = ss.Model;
    starship.Manufacturer = ss.Manufacturer;
    starship.Pilots = ss.Pilots;
    db.SaveChanges();

    return "Successfully Modified";
});

app.MapPut("/{id}", (int id, [FromBody] Starship ss, StarWarsContext db) =>
{
    Console.WriteLine(JsonSerializer.Serialize(ss));

    Starship? starship = new Starship();
    starship.name = ss.name;
    starship.Model = ss.Model;
    starship.Manufacturer = ss.Manufacturer;

    if (ss.URL is not null)
    {
        starship.URL = ss.URL;
    }
    else
    {
        starship.URL = "No URL";
    }
    if (ss.Pilots is not null)
    {
        starship.Pilots = ss.Pilots;
    }
    else
    {
        starship.Pilots = new List<string>();
    }
    starship.Films = new List<string>();

    db.Starships.Add(starship);
    
    db.SaveChanges();

    return starship.Id;
});


app.MapGet("/random", (StarWarsContext db) =>
        db.Starships.OrderBy((ss) => Guid.NewGuid()).First()
    )
    .WithName("GetRandomStarShip").WithOpenApi();

app.Run();

