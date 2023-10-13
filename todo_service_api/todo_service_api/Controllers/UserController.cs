using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using todo_service_api.Configuration;
using todo_service_api.Services;

namespace todo_service_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public IMockDatabase MockDatabase { get; }
        private IConfiguration Configuration { get; }

        public UserController(IConfiguration config,
            IMockDatabase mockDatabase)
        {
            Configuration = config;
            MockDatabase = mockDatabase;
        }

        [HttpPost]
        [AllowAnonymous]      
        public IActionResult Login(UserLogin userLogin)
        {
            var user = Authenticate(userLogin);
            if (user != null)
            {
                return Ok(GenerateJwtToken(user));
            }
            return NotFound("User not found");
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username ?? throw new Exception()),
                new Claim(ClaimTypes.Role, user.Role ?? throw new Exception())
            };

            var token = new JwtSecurityToken("dsalfjhkbsdlkjnsadij9er8f09w8rhf09w8rjvp9urim0w9reh0qw9urehwvn0w9poiunrvw08uehfvn0wur8enw08urevn",
                Configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User? Authenticate(UserLogin userLogin)
        {
            return MockDatabase
                .GetUser(
                userLogin.UserName ?? throw new Exception(), 
                userLogin.Password ?? throw new Exception()) 
                ?? null;
        }
    }
}
