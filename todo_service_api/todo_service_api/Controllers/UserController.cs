using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using todo_service_api.Services;

namespace todo_service_api.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public IMockDatabase _mockDatabase { get; }
        private IConfiguration _configuration { get; }

        public UserController(IConfiguration config,
            IMockDatabase mockDatabase)
        {
            _configuration = config;
            _mockDatabase = mockDatabase;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserLogin userLogin)
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
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username ?? throw new Exception()),
                new Claim(ClaimTypes.Role, user.Role ?? throw new Exception())
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User? Authenticate(UserLogin userLogin)
        {
            return _mockDatabase
                .GetUser(
                userLogin.UserName ?? throw new Exception(), 
                userLogin.Password ?? throw new Exception()) 
                ?? null;
        }
    }
}
