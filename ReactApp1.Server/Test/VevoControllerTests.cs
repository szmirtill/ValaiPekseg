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
                .UseInMemoryDatabase("VevoTestDb")
                .Options;

            _context = new ApplicationDbContext(options);

            // 🔹 Tesztadatok feltöltése
            _context.vevo.AddRange(
                new vevo { Id = 1, felhasznalonev = "teszt1", email = "teszt1@valai.hu", jelszo = "hashed" },
                new vevo { Id = 2, felhasznalonev = "teszt2", email = "teszt2@valai.hu", jelszo = "hashed" }
            );
            _context.SaveChanges();

            _controller = new VevoController(_context);
        }

        [Test]
        public async Task GetAll_ReturnsAllVevo()
        {
            // Act
            var result = await _controller.GetAll();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.Value, Is.InstanceOf<IEnumerable<object>>());

            var userList = ((IEnumerable<object>)okResult.Value).ToList();
            Assert.That(userList.Count, Is.EqualTo(2));
        }
    }
}
