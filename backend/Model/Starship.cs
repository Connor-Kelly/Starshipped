using System.ComponentModel.DataAnnotations;

namespace Swapi.Models
{
    public class Starship
    {

        // {
        //   "name": "Rebel transport",
        //   "model": "GR-75 medium transport",
        //   "manufacturer": "Gallofree Yards, Inc.",
        //   "cost_in_credits": "unknown",
        //   "length": "90",
        //   "max_atmosphering_speed": "650",
        //   "crew": "6",
        //   "passengers": "90",
        //   "cargo_capacity": "19000000",
        //   "consumables": "6 months",
        //   "hyperdrive_rating": "4.0",
        //   "MGLT": "20",
        //   "starship_class": "Medium transport",
        //   "pilots": [],
        //   "films": [
        //     "https://swapi.dev/api/films/2/",
        //     "https://swapi.dev/api/films/3/"
        //   ],
        //   "created": "2014-12-15T12:34:52.264000Z",
        //   "edited": "2014-12-20T21:23:49.895000Z",
        //   "url": "https://swapi.dev/api/starships/17/"
        // }
        [Key]
        public int Id { get; set; }
        public string URL { get; set; }
        public string? name { get; set; }
        public string? Model { get; set; }
        public string? Manufacturer { get; set; }
        public string? CostInCredits { get; set; }
        public string? Length { get; set; }
        public string? MaxAtmosphericSpeed { get; set; }
        public string? Crew { get; set; }
        public string? Passengers { get; set; }
        public string? CargoCapacity { get; set; }
        public string? Consumables { get; set; }
        public string? HyprdriveRating { get; set; }
        public string? MGLT { get; set; }
        public string? StarshipClass { get; set; }
        public ICollection<string> Films { get; set; }
        public ICollection<string> Pilots { get; set; }
        public string? Created { get; set; }
        public string? Edited { get; set; }
    }


}