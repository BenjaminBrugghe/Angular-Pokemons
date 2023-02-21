using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Tools;
using System.Data.SqlClient;

namespace Back_end_Angular_Pokemon.Repositories
{
    public class PokemonRepository
    {
        public List<Pokemons> getAllPokemons()
        {
            List<Pokemons> pokemonList = new List<Pokemons>();

            // Création d'une instance de connection
            SqlConnection sqlConnection = Connection.New;

            // Préparation de la commande
            string request = "SELECT * FROM POKEMONS AS pokemons";
            SqlCommand command = new SqlCommand(request, sqlConnection);

            // Ouverture de la connection
            sqlConnection.Open();

            // Execution de la commande
            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Pokemons newPokemon = new()
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1),
                    Type1 = reader.GetString(2),
                    Type2 = reader.GetString(3),
                    Evolution = reader.GetString(4),
                    Price = (float)reader.GetDouble(5),
                    Description = reader.GetString(6),
                    Image = reader.GetString(7)
                };

                pokemonList.Add(newPokemon);
            }

            reader.Close();

            command.Dispose();

            sqlConnection.Close();

            return pokemonList;
        }
    }
}
