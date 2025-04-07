using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🔐 Admin bejelentkezés
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AdminLoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.felhasznalonev) || string.IsNullOrWhiteSpace(request.jelszo))
                return BadRequest("Minden mező kötelező!");

            var admin = await _context.adminok.FirstOrDefaultAsync(a => a.felhasznalonev == request.felhasznalonev);

            if (admin == null || admin.jelszo != request.jelszo)
                return Unauthorized("Hibás felhasználónév vagy jelszó!");

            return Ok(new { message = "Sikeres belépés!" });
        }
    }

    public class AdminLoginRequest
    {
        public string felhasznalonev { get; set; }
        public string jelszo { get; set; }
    }
}
