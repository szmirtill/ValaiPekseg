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
                .UseInMemoryDatabase(databaseName: "RendelesTestDb")
                .Options;

            _context = new ApplicationDbContext(options);

            // ✅ Kötelező mezők hozzáadása!
            _context.rendelesek.AddRange(
                new Rendeles
                {
                    Id = 1,
                    vevo_id = 1,
                    allapot = "Feldolgozás alatt",
                    Keresztnev = "Teszt",
                    Vezeteknev = "User",
                    SzallitasiMod = "pekseghez",
                    Iranyitoszam = "1111",
                    Varos = "Tesztváros",
                    Utca = "Teszt utca",
                    Hazszam = "1"
                },
                new Rendeles
                {
                    Id = 2,
                    vevo_id = 2,
                    allapot = "Kiszállítva",
                    Keresztnev = "Másik",
                    Vezeteknev = "User",
                    SzallitasiMod = "kiszallitas",
                    Iranyitoszam = "2222",
                    Varos = "Másikváros",
                    Utca = "Másik utca",
                    Hazszam = "2"
                },
                new Rendeles
                {
                    Id = 3,
                    vevo_id = 1,
                    allapot = "Teljesítve",
                    Keresztnev = "Teszt",
                    Vezeteknev = "User",
                    SzallitasiMod = "pekseghez",
                    Iranyitoszam = "1111",
                    Varos = "Tesztváros",
                    Utca = "Teszt utca",
                    Hazszam = "3"
                }
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
