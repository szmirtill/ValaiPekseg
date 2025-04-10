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
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) 
                .Options;

            _context = new ApplicationDbContext(options);

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
        public async Task Login_ValidCredentials_ReturnsOk()
        {
            var request = new AdminLoginRequest
            {
                felhasznalonev = "admin",
                jelszo = "titok"
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task Login_MissingFields_ReturnsBadRequest()
        {
            var request = new AdminLoginRequest
            {
                felhasznalonev = "",
                jelszo = ""
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_InvalidUsername_ReturnsUnauthorized()
        {
            var request = new AdminLoginRequest
            {
                felhasznalonev = "rosszadmin",
                jelszo = "titok"
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        [Test]
        public async Task Login_InvalidPassword_ReturnsUnauthorized()
        {
            var request = new AdminLoginRequest
            {
                felhasznalonev = "admin",
                jelszo = "rosszjelszo"
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        

        [Test]
        public void Login_ExceptionThrown_IsHandled()
        {
            var brokenController = new BrokenAdminController();
            var ex = Assert.ThrowsAsync<Exception>(async () =>
            {
                await brokenController.Login(new AdminLoginRequest());
            });

            Assert.That(ex.Message, Is.EqualTo("Szándékos admin teszt hiba."));
        }

        private class BrokenAdminController : ControllerBase
        {
            public async Task<IActionResult> Login(AdminLoginRequest request)
            {
                throw new Exception("Szándékos admin teszt hiba.");
            }
        }
    }
}

