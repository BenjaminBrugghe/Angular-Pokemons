using System.Data.SqlClient;

namespace Back_end_Angular_Pokemon.Tools
{
    public class Connection
    {
        private static string connectionString = @"Data Source=(localDB)\angular-pokemon;Integrated Security=True";
        public static SqlConnection New { get => new SqlConnection(connectionString); }
    }
}
