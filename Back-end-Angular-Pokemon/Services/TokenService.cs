using Back_end_Angular_Pokemon.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back_end_Angular_Pokemon.Services
{
    public class TokenService
    {
        public string createToken(Utilisateurs user)
        {
            // Instance de JwTSecurityTokenHandler
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            // Configuration du Token
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Expires = DateTime.Now.AddMinutes(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySecretKeymySecretKeymySecretKey")), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "MyIssuers",
                Audience = "MyAudience",

                // Création des role pour mon application
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("email", user.Email),
                        new Claim("lastname", user.Lastname),
                        new Claim("firstname", user.Firstname)
                })
            };
            SecurityToken token = tokenHandler.CreateToken(securityTokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
