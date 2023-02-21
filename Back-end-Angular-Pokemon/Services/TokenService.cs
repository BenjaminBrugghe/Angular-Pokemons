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
                        new Claim("userId", user.Id.ToString()),
                        new Claim("userLastname", user.Lastname),
                        new Claim("userFirstname", user.Firstname),
                        new Claim("userEmail", user.Email)
                })
            };
            SecurityToken token = tokenHandler.CreateToken(securityTokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public Utilisateurs verifyToken(string encodedToken)
        {
            // Instance de JwTSecurityTokenHandler
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            TokenValidationParameters validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = "MyIssuers",
                ValidateAudience = true,
                ValidAudience = "MyAudience",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mySecretKeymySecretKeymySecretKey"))
            };

            SecurityToken validatedToken;

            var claimsPrincipal = tokenHandler.ValidateToken(encodedToken, validationParameters, out validatedToken);

            Utilisateurs user = new(
                id: Convert.ToInt32(claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == "userId")?.Value ?? "default_userId_value"),
                lastname: claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == "userLastname")?.Value ?? "default_userId_value",
                firstname: claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == "userFirstname")?.Value ?? "default_userId_value",
                email: claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == "userEmail")?.Value ?? "default_userId_value",
                password: ""
                );
            return user;
        }
    }
}
