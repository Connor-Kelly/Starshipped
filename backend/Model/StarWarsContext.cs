using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Swapi.Models;

    public class StarWarsContext : DbContext
    {
        public DbSet<Starship> Starships { get; set; }
        // public DbSet<Post> Posts { get; set; }

        public string DbPath { get; }

        // private static HttpClient httpClient = new()
        // {
        // };

        public StarWarsContext(DbContextOptions<StarWarsContext> options) : base(options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "swapi.db");
        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=localhost,1433;Database=starwars;User Id=sa;Password=GoEngineerProject123!;Trusted_Connection=False;Encrypt=False;")

            ;
        }
    }