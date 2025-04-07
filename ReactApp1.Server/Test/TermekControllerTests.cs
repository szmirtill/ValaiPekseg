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
    public class TermekControllerTests
    {
        private ApplicationDbContext _context;
        private TermekekController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("TermekTestDb")
                .Options;

            _context = new ApplicationDbContext(options);

            // 🔹 Tesztadatok feltöltése
            _context.Termekek.AddRange(
                new Termek { Id = 1, Nev = "Kakaós csiga", Ar = 350, kategoria_id = 1, Kategoria = new Kategoria { Id = 1, Nev = "Péksütemény" } },
                new Termek { Id = 2, Nev = "Túrós batyu", Ar = 400, kategoria_id = 2, Kategoria = new Kategoria { Id = 2, Nev = "Édesség" } }
            );
            _context.SaveChanges();

            _controller = new TermekekController(_context);
        }

        [Test]
        public async Task GetTermekek_ReturnsAllProducts()
        {
            // Act
            var result = await _controller.GetTermekek(null); // ez a helyes hívás

            // Assert
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);

            var termekLista = okResult.Value as IEnumerable<object>; // anonim típus miatt "object"
            Assert.That(termekLista.Count(), Is.EqualTo(2));
        }
    }
}
