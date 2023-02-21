using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Tools;
using System.Data.SqlClient;

namespace Back_end_Angular_Pokemon.Repositories
{
    public class PanierRepository
    {
        public List<Panier> getUserCart(int userId)
        {
            List<Panier> userCart = new List<Panier>();

            SqlConnection sqlConnection = Connection.New;

            string request = "SELECT * FROM PANIER WHERE UTILISATEUR_ID = @Id";
            SqlCommand command = new SqlCommand(request, sqlConnection);

            command.Parameters.Add(new SqlParameter("@Id", userId));

            sqlConnection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Panier newItem = new Panier()
                {
                    Id = reader.GetInt32(0),
                    UtilisateurID = reader.GetInt32(1),
                    PokemonID = reader.GetInt32(2),
                    PokemonName = reader.GetString(3),
                    PokemonType1 = reader.GetString(4),
                    PokemonType2 = reader.GetString(5),
                    PokemonEvolution = reader.GetString(6),
                    PokemonPrice = (float)reader.GetDouble(7),
                    PokemonDescription = reader.GetString(8),
                    PokemonImage = reader.GetString(9)
                };
                userCart.Add(newItem);
            }

            reader.Close();

            command.Dispose();

            sqlConnection.Close();

            return userCart;
        }
    }
}
