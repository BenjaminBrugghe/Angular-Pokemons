namespace Back_end_Angular_Pokemon.Models
{
    public class Utilisateurs
    {
        private int id;
        private string lastname;
        private string firstname;
        private string email;
        private string password;

        public Utilisateurs() { }

        public Utilisateurs(int id, string lastname, string firstname, string email, string password)
        {
            this.Id = id;
            this.Lastname = lastname;
            this.Firstname = firstname;
            this.Email = email;
            this.Password = password;
        }

        public int Id { get => id; set => id = value; }
        public string Lastname { get => lastname; set => lastname = value; }
        public string Firstname { get => firstname; set => firstname = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
    }
}
