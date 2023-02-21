using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Repositories;

namespace Back_end_Angular_Pokemon.Services
{
    public class PokemonService
    {
        private PokemonRepository _repository = new PokemonRepository();

        public List<Pokemons> getAllPokemons()
        {
            return (List<Pokemons>)_repository.getAllPokemons();
        }
    }
}
