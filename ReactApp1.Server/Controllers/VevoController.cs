using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VevoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VevoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // 🔹 1️⃣ Összes felhasználó lekérdezése
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.vevo
                .Select(u => new { u.Id, u.felhasznalonev, u.email })
                .ToListAsync();

            return Ok(users);
        }

        // 🔹 2️⃣ Felhasználó törlése
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.vevo.FindAsync(id);
            if (user == null)
                return NotFound("Felhasználó nem található.");

            _context.vevo.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 🔹 3️⃣ Jelszó visszaállítás (admin hitelesítéssel)
        [HttpPut("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.email) || string.IsNullOrEmpty(request.newPassword) || string.IsNullOrEmpty(request.adminPassword))
            {
                return BadRequest("Minden mező kitöltése kötelező.");
            }

            // Ellenőrizzük az admin jelszót
            var admin = await _context.adminok.FirstOrDefaultAsync(a => a.jelszo == request.adminPassword);
            if (admin == null)
                return Unauthorized("Hibás admin jelszó.");

            // Keressük meg a felhasználót
            var user = await _context.vevo.FirstOrDefaultAsync(u => u.Id == request.userId && u.email == request.email);
            if (user == null)
                return NotFound("Felhasználó nem található vagy nem egyezik az email.");

            // Jelszó frissítése bcrypt hash-el
            user.jelszo = BCrypt.Net.BCrypt.HashPassword(request.newPassword);
            await _context.SaveChangesAsync();

            return Ok("Jelszó sikeresen frissítve!");
        }
    }

    public class ResetPasswordRequest
    {
        public int userId { get; set; }
        public string email { get; set; }
        public string newPassword { get; set; }
        public string adminPassword { get; set; }
    }
}
