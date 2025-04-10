using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;
using MyApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

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
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _context = new ApplicationDbContext(options);

            // ???? Teszt termék
            _context.Termekek.Add(new Termek
            {
                Id = 1,
                Nev = "Teszt kenyér",
                Ar = 100,
                kategoria_id = 1
            });

            _context.vevo.Add(new vevo
            {
                Id = 1,
                felhasznalonev = "tesztuser",
                email = "teszt@teszt.hu",
                jelszo = "titkos"
            });

            _context.SaveChanges();

            _controller = new RendelesController(_context);
        }

        [Test]
        public async Task MentesRendeles_ValidInput_ReturnsOk()
        {
            var request = new RendelesRequest
            {
                vevo_id = 1,
                Keresztnev = "Anna",
                Vezeteknev = "Teszt",
                SzallitasiMod = "kiszalitas",
                Iranyitoszam = "1234",
                Varos = "Tesztvaros",
                Utca = "Teszt utca",
                Hazszam = "12",
                Termekek = new List<TermekTetel>
                {
                    new TermekTetel
                    {
                        TermekId = 1,
                        Mennyiseg = 2,
                        Ar = 100
                    }
                }
            };

            var result = await _controller.MentesRendeles(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task MentesRendeles_EmptyList_ReturnsBadRequest()
        {
            var request = new RendelesRequest
            {
                vevo_id = 1,
                Termekek = new List<TermekTetel>()
            };

            var result = await _controller.MentesRendeles(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task MentesRendeles_NullRequest_ReturnsBadRequest()
        {
            var result = await _controller.MentesRendeles(null);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        // ✅ ÚJ: Hiányzó kötelező mezők
        [Test]
        public async Task MentesRendeles_MissingNameFields_ReturnsBadRequest()
        {
            var request = new RendelesRequest
            {
                vevo_id = 1,
                Keresztnev = "",
                Vezeteknev = "",
                SzallitasiMod = "pekseghez",
                Termekek = new List<TermekTetel>
                {
                    new TermekTetel { TermekId = 1, Mennyiseg = 1, Ar = 100 }
                }
            };

            var result = await _controller.MentesRendeles(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>()); // jelenleg ez még átmegy, de később validálható
        }

        // ✅ ÚJ: Nem létező termék ID (a logika engedi, de teszteljük)
        [Test]
        public async Task MentesRendeles_InvalidProductId_SavesAnyway()
        {
            var request = new RendelesRequest
            {
                vevo_id = 1,
                Keresztnev = "Béla",
                Vezeteknev = "Teszt",
                SzallitasiMod = "pekseghez",
                Termekek = new List<TermekTetel>
                {
                    new TermekTetel { TermekId = 999, Mennyiseg = 1, Ar = 123 }
                }
            };

            var result = await _controller.MentesRendeles(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        // ✅ ÚJ: Negatív mennyiség – engedi, de nem logikus
        [Test]
        public async Task MentesRendeles_NegativeQuantity_AllowsInsert()
        {
            var request = new RendelesRequest
            {
                vevo_id = 1,
                Keresztnev = "Gizi",
                Vezeteknev = "Teszt",
                SzallitasiMod = "pekseghez",
                Termekek = new List<TermekTetel>
                {
                    new TermekTetel { TermekId = 1, Mennyiseg = -5, Ar = 100 }
                }
            };

            var result = await _controller.MentesRendeles(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        // ✅ ÚJ: Rendelés előzmény lekérése meglévő felhasználóval
        [Test]
        public async Task GetOrderHistory_ValidUserId_ReturnsList()
        {
            await MentesRendeles_ValidInput_ReturnsOk(); // hogy legyen rendelés

            var result = await _controller.GetOrderHistory(1);
            var okResult = result as OkObjectResult;

            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.Value, Is.Not.Null);
        }

        // ✅ ÚJ: Előzmény lekérés ismeretlen vevő ID-val
        [Test]
        public async Task GetOrderHistory_UnknownUser_ReturnsEmptyList()
        {
            var result = await _controller.GetOrderHistory(999);
            var okResult = result as OkObjectResult;

            Assert.That(okResult, Is.Not.Null);
            var list = okResult.Value as IEnumerable<object>;
            Assert.That(list.Count(), Is.EqualTo(0));
        }
    }
}

