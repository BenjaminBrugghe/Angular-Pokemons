using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{
    [EnableCors("angular")]
    [Route("api/[controller]")]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private UtilisateurService _service = new UtilisateurService();

        // GET: api/<UtilisateurController>
        [HttpGet]
        public IEnumerable<Utilisateurs> GetAllUsers()
        {
            return _service.getAllUsers();
        }

        // POST api/<UtilisateurController>
        [HttpPost]
        public int CreateUser([FromBody] Utilisateurs user)
        {
            return _service.createUser(user.Lastname, user.Firstname, user.Email, user.Password);
        }

        // GET api/<UtilisateurController>/5
        [HttpPost]
        [Route("/getByEmail")]
        public Utilisateurs GetUserByEmail([FromBody] string email)
        {
            return _service.getUserByEmail(email);
        }

        // **************************************************************

        // GET api/<UtilisateurController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // PUT api/<UtilisateurController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UtilisateurController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
