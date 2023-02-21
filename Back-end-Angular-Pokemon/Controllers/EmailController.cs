using Back_end_Angular_Pokemon.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_Angular_Pokemon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private EmailService _service = new EmailService();

        // GET: api/<EmailController>
        [HttpPost]
        public bool CheckEmailAlreadyExists([FromBody] string email)
        {
            return _service.checkEmailAlreadyExists(email);
        }
    }
}
