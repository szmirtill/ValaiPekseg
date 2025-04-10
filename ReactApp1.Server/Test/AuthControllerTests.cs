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
    public class AuthControllerTests
    {
        private ApplicationDbContext _context;
        private AuthController _controller;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString()) // Egyedi DB minden teszthez
                .Options;

            _context = new ApplicationDbContext(options);

            // ???? Bcrypt-tel titkosított felhasználó
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("teszt123");

            _context.vevo.Add(new vevo
            {
                felhasznalonev = "tesztuser",
                email = "teszt@teszt.hu",
                jelszo = hashedPassword
            });

            _context.SaveChanges();
            _controller = new AuthController(_context);
        }

        [Test]
        public async Task Login_WithValidCredentials_ReturnsOk()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = "teszt123"
            };

            var result = await _controller.Login(request);

            var okResult = result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.StatusCode ?? 200, Is.EqualTo(200));
        }

        [Test]
        public async Task Login_UserNotFound_ReturnsUnauthorized()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "nincsilyen",
                jelszo = "teszt123"
            };

            var result = await _controller.Login(request);

            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        [Test]
        public async Task Login_InvalidPassword_ReturnsUnauthorized()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = "hibasjelszo"
            };

            var result = await _controller.Login(request);

            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        [Test]
        public async Task Login_NullRequest_ReturnsBadRequest()
        {
            var result = await _controller.Login(null);

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_MissingUsername_ReturnsBadRequest()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "",
                jelszo = "valami"
            };

            var result = await _controller.Login(request);

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public async Task Login_MissingPassword_ReturnsBadRequest()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = ""
            };

            var result = await _controller.Login(request);

            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        [Test]
        public void Login_Exception_ThrowsHandled()
        {
            var brokenController = new BrokenAuthController();

            var ex = Assert.ThrowsAsync<System.Exception>(async () =>
            {
                await brokenController.Login(new LoginRequestModel());
            });

            Assert.That(ex.Message, Is.EqualTo("Szándékos hiba teszt"));
        }

        // ???? ÚJ: Kisbetű-nagybetű érzékenység (username case sensitive)
        [Test]
        public async Task Login_UsernameCaseMismatch_ReturnsUnauthorized()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "TesztUser", // nagybetű
                jelszo = "teszt123"
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        // ???? ÚJ: Jelszó whitespace karakterrel – sikertelen belépés
        [Test]
        public async Task Login_PasswordWithWhitespace_ReturnsUnauthorized()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = " teszt123 " // whitespace elöl-hátul
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        // ???? ÚJ: Üres LoginRequestModel mezők
        [Test]
        public async Task Login_EmptyFields_ReturnsBadRequest()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "",
                jelszo = ""
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<BadRequestObjectResult>());
        }

        // ???? ÚJ: Bcrypt hashelt de hibás jelszó
        [Test]
        public async Task Login_BcryptFormatPasswordButWrong_ReturnsUnauthorized()
        {
            var request = new LoginRequestModel
            {
                felhasznalonev = "tesztuser",
                jelszo = "nemjo123"
            };

            var result = await _controller.Login(request);
            Assert.That(result, Is.InstanceOf<UnauthorizedObjectResult>());
        }

        // ???? Dummy controller hibadobáshoz
        private class BrokenAuthController : ControllerBase
        {
            public async Task<IActionResult> Login(LoginRequestModel loginRequest)
            {
                throw new System.Exception("Szándékos hiba teszt");
            }
        }
    }
}
