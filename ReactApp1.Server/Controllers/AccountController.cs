using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.felhasznalonev) ||
                string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.jelszo))
            {
                return BadRequest("Minden mező kitöltése kötelező.");
            }

            var existingUser = await _context.vevo
                .FirstOrDefaultAsync(u => u.felhasznalonev == request.felhasznalonev || u.email == request.email);

            if (existingUser != null)
            {
                return Conflict("A felhasználónév vagy az e-mail cím már foglalt.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.jelszo);

            var newUser = new vevo
            {
                felhasznalonev = request.felhasznalonev,
                email = request.email,
                jelszo = hashedPassword
            };

            _context.vevo.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sikeres regisztráció!", userId = newUser.Id });
        }

       
        [HttpPut("update")]
        public async Task<IActionResult> UpdateAccount([FromBody] UpdateRequest request)
        {
            if (request.userId <= 0)
                return BadRequest("Hiányzó felhasználó azonosító.");

            var user = await _context.vevo.FirstOrDefaultAsync(u => u.Id == request.userId);

            if (user == null)
                return NotFound("Felhasználó nem található.");

            if (!string.IsNullOrEmpty(request.email))
            {
                user.email = request.email;
            }

            if (!string.IsNullOrEmpty(request.jelszo))
            {
                user.jelszo = BCrypt.Net.BCrypt.HashPassword(request.jelszo);
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "Adatok sikeresen frissítve!" });
        }

       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (id <= 0)
                return BadRequest("Érvénytelen ID.");

            var user = await _context.vevo.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound("Felhasználó nem található.");

            return Ok(new { user.Id, user.felhasznalonev, user.email });
        }

        internal async Task Register(Microsoft.AspNetCore.Identity.Data.LoginRequest request)
        {
            throw new NotImplementedException();
        }
    }

    public class RegisterRequest
    {
        public string felhasznalonev { get; set; }
        public string email { get; set; }
        public string jelszo { get; set; }
    }

    public class UpdateRequest
    {
        public int userId { get; set; }
        public string email { get; set; }
        public string? jelszo { get; set; }
    }
}
