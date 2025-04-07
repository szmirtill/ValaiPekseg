using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;
using MyApp.Models;
using System;
using System.Threading.Tasks;

namespace ReactApp1.Server.Test
{
    [TestFixture]
    public class AdminControllerTests
    {
        private ApplicationDbContext _context;
        private AdminController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // 💡 Egyedi név minden teszthez
                .Options;

            _context = new ApplicationDbContext(options);

            // 🔹 Teszt admin hozzáadása
            _context.adminok.Add(new Admin
            {
                id = 1,
                felhasznalonev = "admin",
                jelszo = "titok"
            });
            _context.SaveChanges();

            _controller = new AdminController(_context);
        }

        [Test]
        public async Task Login_ValidAdmin_ReturnsOk()
        {
            // Arrange
            var request = new AdminLoginRequest
            {
                felhasznalonev = "admin",
                jelszo = "titok"
            };

            // Act
            var result = await _controller.Login(request);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task Login_MissingFields_ReturnsBadRequest()
        {
            // Arrange
            var request = new AdminLoginRequest
            {
                felhasznalonev = "",
                jelszo = ""
            };

            // Act
            var result = await _controller.Login(request);

            // Assert
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }
    }
}
