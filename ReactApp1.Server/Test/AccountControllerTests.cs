using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;

namespace ReactApp1.Server.Test
{
    [TestFixture]
    public class AccountControllerTests
    {
        private ApplicationDbContext _context;
        private AccountController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;

            _context = new ApplicationDbContext(options);
            _controller = new AccountController(_context);
        }

        [Test]
        public async Task Register_ValidInput_ReturnsOkResult()
        {
            // Arrange
            var request = new RegisterRequest
            {
                felhasznalonev = "tesztadmin",
                email = "tesztadmin@admin.hu",
                jelszo = "admin123"
            };

            // Act
            var result = await _controller.Register(request);

            // Assert
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }
    }
}
