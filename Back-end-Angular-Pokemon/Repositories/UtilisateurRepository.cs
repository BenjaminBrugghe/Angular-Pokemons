using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Tools;
using System.Data;
using System.Data.SqlClient;

namespace Back_end_Angular_Pokemon.Repositories
{
    public class UtilisateurRepository
    {
        public List<Utilisateurs> getAllUsers()
        {
            List<Utilisateurs> userList = new List<Utilisateurs>();

            SqlConnection sqlConnection = Connection.New;

            string request = "SELECT * FROM UTILISATEURS";

            SqlCommand command = new SqlCommand(request, sqlConnection);

            sqlConnection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Utilisateurs newUser = new Utilisateurs()
                {
                    Id = reader.GetInt32(0),
                    Lastname = reader.GetString(1),
                    Firstname = reader.GetString(2),
                    Email = reader.GetString(3),
                    Password = reader.GetString(4)
                };

                userList.Add(newUser);
            }

            reader.Close();

            command.Dispose();

            sqlConnection.Close();

            return userList;
        }

        public Utilisateurs getUserByEmail(string email)
        {
            Utilisateurs userFound = new();

            SqlConnection sqlConnection = Connection.New;

            string request = "SELECT * FROM UTILISATEURS WHERE EMAIL = @Email";

            SqlCommand command = new SqlCommand(request, sqlConnection);

            command.Parameters.Add(new SqlParameter("@Email", email));

            sqlConnection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Utilisateurs newUser = new Utilisateurs()
                {
                    Id = reader.GetInt32(0),
                    Lastname = reader.GetString(1),
                    Firstname = reader.GetString(2),
                    Email = reader.GetString(3),
                    Password = reader.GetString(4)
                };
                userFound = newUser;
            }

            reader.Close();

            command.Dispose();

            sqlConnection.Close();

            return userFound;
        }

        public int createUser(string lastname, string firstname, string email, string password)
        {
            SqlConnection sqlConnection = Connection.New;

            string request = "INSERT INTO UTILISATEURS (lastname, firstname, email, password) OUTPUT INSERTED.ID VALUES (@lastname, @firstname, @email, @password)";

            SqlCommand command = new SqlCommand(request, sqlConnection);

            command.Parameters.Add(new SqlParameter("@lastname", lastname));
            command.Parameters.Add(new SqlParameter("@firstname", firstname));
            command.Parameters.Add(new SqlParameter("@email", email));
            command.Parameters.Add(new SqlParameter("@password", password));

            sqlConnection.Open();

            int Id = (int)command.ExecuteScalar();

            command.Dispose();
            sqlConnection.Close();
            return Id;
        }
    }
}
