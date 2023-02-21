using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Repositories;
using System;
using System.Security.Cryptography;

namespace Back_end_Angular_Pokemon.Services
{
    public class PasswordService
    {
        private UtilisateurRepository _repository = new UtilisateurRepository();

        public string hashPassword(string userPassword)
        {
            // Génère un salt aléatoire
            byte[] salt = new byte[16];

            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            // Hash le password avec le salt généré
            byte[] hash = new Rfc2898DeriveBytes(userPassword, salt, 10000).GetBytes(20);

            // Combine le salt et le password hashé en un seul string
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }

        public bool verifyPassword(string email, string userPassword)
        {
            Utilisateurs userFound = _repository.getUserByEmail(email);

            string hashedPassword = userFound.Password;

            // Convertit le password hashé en bytes
            byte[] hashBytes = Convert.FromBase64String(hashedPassword);

            // Extrait le salt provenant du hash
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Hash le userPassword avec le même salt
            byte[] enteredHash = new Rfc2898DeriveBytes(userPassword, salt, 10000).GetBytes(20);

            // Compare le computed hash avec le stored hash
            for (int i = 0; i < 20; i++)
            {
                if (hashBytes[i + 16] != enteredHash[i])
                {
                    return false;
                }
            }
            return true;
        }
    }
}
