using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;
using MyApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactApp1.Server.Test
{
    [TestFixture]
    public class VevoControllerTests
    {
        private ApplicationDbContext _context;
        private VevoController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);

            _context.adminok.Add(new Admin { id = 1, felhasznalonev = "admin", jelszo = "admin123" });

            _context.vevo.AddRange(
                new vevo { Id = 1, felhasznalonev = "teszt1", email = "teszt1@valai.hu", jelszo = BCrypt.Net.BCrypt.HashPassword("jelszo1") },
                new vevo { Id = 2, felhasznalonev = "teszt2", email = "teszt2@valai.hu", jelszo = "hashed" }
            );
            _context.SaveChanges();

            _controller = new VevoController(_context);
        }

        [Test]
        public async Task GetAll_ReturnsAllVevo()
        {
            var result = await _controller.GetAll();
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            var userList = (okResult.Value as IEnumerable<object>)?.ToList();
            Assert.That(userList?.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task Delete_ExistingUser_ReturnsNoContent()
        {
            var result = await _controller.Delete(1);
            Assert.That(result, Is.InstanceOf<NoContentResult>());
        }

        [Test]
        public async Task Delete_NonExistingUser_ReturnsNotFound()
        {
            var result = await _controller.Delete(999);
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task ResetPassword_ValidRequest_ReturnsOk()
        {
            var request = new ResetPasswordRequest
            {
                userId = 1,
                email = "teszt1@valai.hu",
                newPassword = "ujjelszo123",
                adminPassword = "admin123"
            };

            var result = await _controller.ResetPassword(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task ResetPassword_InvalidAdminPassword_ReturnsUnauthorized()
        {
            var request = new ResetPasswordRequest
            {
                userId = 1,
                email = "teszt1@valai.hu",
                newPassword = "ujjelszo123",
                adminPassword = "rosszadmin"
            };

            var result = await _controller.ResetPassword(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        [Test]
        public async Task ResetPassword_InvalidEmail_ReturnsNotFound()
        {
            var request = new ResetPasswordRequest
            {
                userId = 1,
                email = "nemletezik@valai.hu",
                newPassword = "ujjelszo123",
                adminPassword = "admin123"
            };

            var result = await _controller.ResetPassword(request);
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task ResetPassword_MissingFields_ReturnsBadRequest()
        {
            var request = new ResetPasswordRequest
            {
                userId = 1,
                email = "",
                newPassword = "",
                adminPassword = ""
            };

            var result = await _controller.ResetPassword(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task ResetPassword_NonExistingUserId_ReturnsNotFound()
        {
            var request = new ResetPasswordRequest
            {
                userId = 999,
                email = "teszt1@valai.hu",
                newPassword = "ujjelszo123",
                adminPassword = "admin123"
            };

            var result = await _controller.ResetPassword(request);
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }

        [Test]
        public async Task Delete_RemovesUserFromDatabase()
        {
            await _controller.Delete(1);
            var vevo = await _context.vevo.FindAsync(1);
            Assert.That(vevo, Is.Null);
        }

        [Test]
        public async Task GetAll_ReturnsCorrectType()
        {
            var result = await _controller.GetAll();
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }
    }
}
