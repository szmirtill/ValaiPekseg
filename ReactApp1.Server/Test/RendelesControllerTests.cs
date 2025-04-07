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
    public class RendelesControllerTests
    {
        private ApplicationDbContext _context;
        private RendelesController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("RendelesTestDb")
                .Options;

            _context = new ApplicationDbContext(options);

            // 🔹 Feltöltés tesztadatokkal
            _context.rendelesek.AddRange(
                new Rendeles { Id = 1, vevo_id = 1, allapot = "Feldolgozás alatt" },
                new Rendeles { Id = 2, vevo_id = 2, allapot = "Kiszállítva" },
                new Rendeles { Id = 3, vevo_id = 1, allapot = "Teljesítve" }
            );
            _context.SaveChanges();

            _controller = new RendelesController(_context);
        }

        [Test]
        public async Task GetOrderHistory_ReturnsCorrectOrders()
        {
            // Act
            var result = await _controller.GetOrderHistory(1);

            // Assert
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);

            var rendelesek = okResult.Value as IEnumerable<dynamic>;
            Assert.That(rendelesek.Count(), Is.EqualTo(2)); // Csak vevo_id = 1 rendelései jönnek vissza
        }
    }
}
