
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
builder.Services.AddDbContext<StarWarsContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        .UseSeeding((db, _) =>
        {
            HttpClient httpClient = new() { };

            if (db.Set<Starship>().Count() != 0) {
                return;
            }

            var task = Task.Run(() => httpClient.GetFromJsonAsync<StarshipPage>(
                        "https://swapi.dev/api/starships"));

            // StarshipsPage ? starshipsPage = await httpClient.GetFromJsonAsync<StarshipsPage>(
            // "https://swapi.dev/api/starships");
            task.Wait();

            StarshipPage starshipsPage = task.Result;

            if (starshipsPage?.results != null)
            {
                db.AddRange(starshipsPage.results);
                db.SaveChanges();
            }
        })
        .EnableSensitiveDataLogging();
        // options.Database.EnsureCreated();
    }

    );


var app = builder.Build();

app.UseHttpsRedirection();


using (var scope =
  app.Services.CreateScope())
using (var context = scope.ServiceProvider.GetService<StarWarsContext>())
    context?.Database.EnsureCreated();
// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast")
// .WithOpenApi();

app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
