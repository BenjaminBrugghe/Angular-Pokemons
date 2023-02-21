using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private TokenService _service = new TokenService();

        // POST api/<TokenController>
        [HttpPost]
        public string CreateToken([FromBody] Utilisateurs user)
        {
            return _service.createToken(user);
        }

        // GET: api/<TokenController>
        [HttpPost]
        [Route("/verifyToken")]
        public Utilisateurs VerifyToken([FromBody] string token) 
        {
            return _service.verifyToken(token);
        }
    }
}
