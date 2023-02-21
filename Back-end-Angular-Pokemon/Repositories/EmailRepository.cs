using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Tools;
using System.Data.SqlClient;

namespace Back_end_Angular_Pokemon.Repositories
{
    public class EmailRepository
    {
        public bool checkEmailAlreadyExists(string userEmail)
        {
            bool emailExists = false;

            SqlConnection sqlConnection = Connection.New;

            string request = "SELECT * FROM UTILISATEURS WHERE EMAIL = @Email";

            SqlCommand command = new SqlCommand(request, sqlConnection);

            command.Parameters.Add(new SqlParameter("@Email", userEmail));

            sqlConnection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Utilisateurs userFound = new Utilisateurs()
                {
                    Id = reader.GetInt32(0),
                    Lastname = reader.GetString(1),
                    Firstname = reader.GetString(2),
                    Email = reader.GetString(3),
                    Password = reader.GetString(4)
                };

                // Si l'utilisateur existe dans la BDD
                if (userFound != null)
                {
                    emailExists = true;
                }

            }
            reader.Close();
            command.Dispose();
            sqlConnection.Close();

            if (emailExists == true)
            {
                return true;
            }
            return false;
        }
    }
}
