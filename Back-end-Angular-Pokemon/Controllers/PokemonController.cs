using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PokemonController : ControllerBase
    {
        private PokemonService _service = new();

        // GET: api/<PokemonController>
        [HttpGet]
        public IEnumerable<Pokemons> Get()
        {
            return (IEnumerable<Pokemons>)_service.getAllPokemons();
        }
    }
}
