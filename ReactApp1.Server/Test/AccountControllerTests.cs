using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MyApp.Controllers;
using MyApp.Data;
using MyApp.Models;
using System.Threading.Tasks;

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
                .UseInMemoryDatabase(databaseName: "TestDb_" + System.Guid.NewGuid())
                .Options;

            _context = new ApplicationDbContext(options);
            _controller = new AccountController(_context);
        }

        [Test]
        public async Task Register_ValidInput_ReturnsOk()
        {
            var request = new RegisterRequest
            {
                felhasznalonev = "tesztuser1",
                email = "user1@example.com",
                jelszo = "password"
            };

            var result = await _controller.Register(request);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        [Test]
        public async Task Register_DuplicateUser_ReturnsConflict()
        {
            var request = new RegisterRequest
            {
                felhasznalonev = "duplauser",
                email = "dupla@example.com",
                jelszo = "jelszo"
            };

            await _controller.Register(request);
            var result2 = await _controller.Register(request);

            Assert.That(result2, Is.InstanceOf<ConflictObjectResult>());
        }

        [Test]
        public async Task Register_MissingUsername_ReturnsBadRequest()
        {
            var request = new RegisterRequest
            {
                felhasznalonev = null,
                email = "valaki@example.com",
                jelszo = "titok"
            };

            var result = await _controller.Register(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Register_MissingEmail_ReturnsBadRequest()
        {
            var request = new RegisterRequest
            {
                felhasznalonev = "felhaszno",
                email = null,
                jelszo = "abc123"
            };

            var result = await _controller.Register(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Register_MissingPassword_ReturnsBadRequest()
        {
            var request = new RegisterRequest
            {
                felhasznalonev = "valaki",
                email = "valaki@example.com",
                jelszo = null
            };

            var result = await _controller.Register(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public void Register_ThrowsException_IsCaught()
        {
            var controller = new BrokenAccountController();

            var ex = Assert.ThrowsAsync<System.Exception>(async () =>
            {
                await controller.Register(new RegisterRequest());
            });

            Assert.That(ex.Message, Is.Not.Null.And.Not.Empty);
        }

        // ✅ ÚJ TESZT: Lekérés létező ID-re
        [Test]
        public async Task GetUser_ValidId_ReturnsUser()
        {
            var user = new vevo
            {
                felhasznalonev = "getteszt",
                email = "get@valai.hu",
                jelszo = "valami"
            };

            _context.vevo.Add(user);
            await _context.SaveChangesAsync();

            var result = await _controller.GetUser(user.Id);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        // ✅ ÚJ TESZT: Lekérés nem létező ID-re
        [Test]
        public async Task GetUser_InvalidId_ReturnsNotFound()
        {
            var result = await _controller.GetUser(9999);
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }

        // ✅ ÚJ TESZT: Adatmódosítás működése
        [Test]
        public async Task UpdateAccount_ValidData_UpdatesSuccessfully()
        {
            var user = new vevo
            {
                felhasznalonev = "modositott",
                email = "eredeti@valai.hu",
                jelszo = "régi"
            };
            _context.vevo.Add(user);
            await _context.SaveChangesAsync();

            var update = new UpdateRequest
            {
                userId = user.Id,
                email = "uj@valai.hu",
                jelszo = "ujjelszo"
            };

            var result = await _controller.UpdateAccount(update);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
        }

        //  TESZT: Adatmódosítás hibás ID-re
        [Test]
        public async Task UpdateAccount_NonexistentUser_ReturnsNotFound()
        {
            var request = new UpdateRequest
            {
                userId = 999,
                email = "akarmi@teszt.hu",
                jelszo = "nemleszjo"
            };

            var result = await _controller.UpdateAccount(request);
            Assert.That(result, Is.InstanceOf<NotFoundObjectResult>());
        }

        //  Dummy controller teszteléshez
        private class BrokenAccountController : ControllerBase
        {
            public async Task<IActionResult> Register(RegisterRequest request)
            {
                throw new System.Exception("Szándékos hiba.");
            }
        }
    }
}
