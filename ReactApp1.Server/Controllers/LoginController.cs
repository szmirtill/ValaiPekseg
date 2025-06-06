﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace MyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.felhasznalonev) || string.IsNullOrEmpty(loginRequest.jelszo))
            {
                return BadRequest("Hibás kérés!");
            }

            var user = await _context.vevo.FirstOrDefaultAsync(u => u.felhasznalonev == loginRequest.felhasznalonev);
            if (user == null)
            {
                return Unauthorized("Felhasználó nem található");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginRequest.jelszo, user.jelszo))
            {
                return Unauthorized("Hibás jelszó");
            }

            return Ok(new { userId = user.Id, username = user.felhasznalonev });
        }
    }

    public class LoginRequestModel
    {
        public string felhasznalonev { get; set; }
        public string jelszo { get; set; }
    }
}
