using System.Threading.Tasks;
using DatingApp.Api.Data;
using DatingApp.Api.Dtos;
using DatingApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        public AuthController(IAuthRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegister) 
        {
            //validate request
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            userForRegister.Username = userForRegister.Username.ToLower();
            if(await _repository.UserExists(userForRegister.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            { 
                Username = userForRegister.Username 
            };

            var createdUser = await _repository.Register(userToCreate, userForRegister.Password);
            return StatusCode(201);
        }
    }
}