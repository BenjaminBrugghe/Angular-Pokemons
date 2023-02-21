using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private PasswordService _service = new PasswordService();

        // POST api/<PasswordController>
        [HttpPost]
        public string HashPassword([FromBody] string userPassword)
        {
            return _service.hashPassword(userPassword);
        }

        // POST api/<PasswordController>
        [Route("/verifyPassword")]
        [HttpPost]
        public bool VerifyPassword([FromBody] Utilisateurs user)
        {
            return _service.verifyPassword(user.Email, user.Password);
        }
    }
}
