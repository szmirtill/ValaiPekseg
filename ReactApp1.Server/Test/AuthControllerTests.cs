using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

namespace ReactApp1.Server.Test
{
    [TestFixture]
    public class AuthControllerTests
    {
        private ApplicationDbContext _context;
        private AuthController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("AuthTestDb")
                .Options;

            _context = new ApplicationDbContext(options);

            // 🔐 Létrehozunk egy felhasználót bcrypt-tel
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("teszt123");

            _context.vevo.Add(new vevo
            {
                felhasznalonev = "tesztuser",
                email = "teszt@teszt.hu",
                jelszo = hashedPassword
            });

            _context.SaveChanges();

            _controller = new AuthController(_context);
        }

        [Test]
        public async Task Login_WithValidCredentials_ReturnsOk()
        {
            // Arrange
            var loginRequest = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = "teszt123"
            };

            // Act
            var result = await _controller.Login(loginRequest);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.StatusCode ?? 200, Is.EqualTo(200));
        }
    }
}
