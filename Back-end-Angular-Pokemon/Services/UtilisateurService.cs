using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Repositories;

namespace Back_end_Angular_Pokemon.Services
{
    public class UtilisateurService
    {
        private UtilisateurRepository _repository = new UtilisateurRepository();
        private PasswordService _passwordService = new PasswordService();

        public List<Utilisateurs> getAllUsers()
        {
            return _repository.getAllUsers();
        }

        public Utilisateurs getUserByEmail(string email)
        {
            return _repository.getUserByEmail(email);
        }

        public int createUser(string lastname, string firstname, string email, string password)
        {
            string hashedPassword = _passwordService.hashPassword(password);

            return _repository.createUser(lastname, firstname, email, hashedPassword);
        }
    }
}
