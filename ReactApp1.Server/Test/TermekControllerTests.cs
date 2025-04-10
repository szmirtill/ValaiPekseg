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
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);

            
            var kat1 = new Kategoria { Id = 1, Nev = "Péksütemény" };
            var kat2 = new Kategoria { Id = 2, Nev = "Édesség" };
            _context.Kategoriak.AddRange(kat1, kat2);

           
            _context.Termekek.AddRange(
                new Termek
                {
                    Id = 1,
                    Nev = "Kakaós csiga",
                    Ar = 350,
                    kategoria_id = 1,
                    Kategoria = kat1,
                    Kep = new byte[] { 1, 2, 3, 4 }
                },
                new Termek
                {
                    Id = 2,
                    Nev = "Túrós batyu",
                    Ar = 400,
                    kategoria_id = 2,
                    Kategoria = kat2
                }
            );

            _context.SaveChanges();

            _controller = new TermekekController(_context);
        }

        [Test]
        public async Task GetTermekek_ReturnsAll()
        {
            var result = await _controller.GetTermekek(null);
            var okResult = result as OkObjectResult;

            Assert.That(okResult, Is.Not.Null);
            var termekLista = okResult.Value as IEnumerable<object>;
            Assert.That(termekLista.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task GetTermekek_FilterByKategoriaId_ReturnsOne()
        {
            var result = await _controller.GetTermekek(1);
            var okResult = result as OkObjectResult;

            Assert.That(okResult, Is.Not.Null);
            var termekLista = okResult.Value as IEnumerable<object>;
            Assert.That(termekLista.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task GetTermekek_ReturnsImageAsBase64()
        {
            var result = await _controller.GetTermekek(null);
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);

            dynamic first = (okResult.Value as IEnumerable<dynamic>).First();
            Assert.That(first.Kep, Is.TypeOf<string>());
        }

        [Test]
        public async Task GetTermekek_WithEmptyCategory_ReturnsAll()
        {
            var result = await _controller.GetTermekek(null);
            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            var termekek = okResult.Value as IEnumerable<object>;
            Assert.That(termekek.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task UpdateTermek_ValidId_ChangesPrice()
        {
            var result = await _controller.UpdateTermek(1, 999);
            var okResult = result as OkObjectResult;

            Assert.That(okResult, Is.Not.Null);
            var updated = await _context.Termekek.FindAsync(1);
            Assert.That(updated.Ar, Is.EqualTo(999));
        }

        [Test]
        public async Task UpdateTermek_InvalidId_ReturnsNotFound()
        {
            var result = await _controller.UpdateTermek(999, 999);
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async Task UpdateTermek_NegativePrice_ReturnsOk()
        {
            var result = await _controller.UpdateTermek(1, -123);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());

            var updated = await _context.Termekek.FindAsync(1);
            Assert.That(updated.Ar, Is.EqualTo(-123));
        }

        [Test]
        public async Task UpdateTermek_ZeroPrice_ReturnsOk()
        {
            var result = await _controller.UpdateTermek(1, 0);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());

            var updated = await _context.Termekek.FindAsync(1);
            Assert.That(updated.Ar, Is.EqualTo(0));
        }

        [Test]
        public async Task DeleteTermek_ValidId_DeletesProduct()
        {
            var result = await _controller.DeleteTermek(1);
            Assert.That(result, Is.InstanceOf<NoContentResult>());

            var deleted = await _context.Termekek.FindAsync(1);
            Assert.That(deleted, Is.Null);
        }

        [Test]
        public async Task DeleteTermek_InvalidId_ReturnsNotFound()
        {
            var result = await _controller.DeleteTermek(999);
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }

        [Test]
        public async Task DeleteTermek_AlreadyDeleted_ReturnsNotFound()
        {
            await _controller.DeleteTermek(1); 
            var result = await _controller.DeleteTermek(1); 
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }
    }
}

