using Back_end_Angular_Pokemon.Models;
using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PanierController : ControllerBase
    {
        private PanierService _service = new();

        // GET api/<PanierController>/5
        [HttpGet("{id}")]
        public IEnumerable<Panier> GetUserCart(int id)
        {
            return (IEnumerable<Panier>)_service.getUserCart(id);
        }

        // ********************************************************

        // POST api/<PanierController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PanierController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PanierController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
