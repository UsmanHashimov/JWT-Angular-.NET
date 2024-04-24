using Auth_Identity.DTOs;
using Auth_Identity.Models;
using Auth_Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Auth_Identity.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        public AuthController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IAuthService authService)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _authService = authService;
        }

        [HttpPost]
        public async Task<ActionResult<ResponceDTO>> Register(RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ResponceDTO
                {
                    Message = "User cannot created",
                    StatusCode = 403
                });
            }

            var user = new User
            {
                FullName = model.FullName,
                UserName = model.Email,
                Email = model.Email,
                Age = model.Age,
                Status = model.Status,
            };

            var res = await _userManager.CreateAsync(user, model.Password);

            if (!res.Succeeded)
            {
                return BadRequest(new ResponceDTO
                {
                    Message = $"{res.Errors}",
                    StatusCode = 403
                });
            }

            foreach (var role in model.Roles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return Ok(new ResponceDTO
            {
                Message = "You succesfully registered!",
                StatusCode = 200,
                isSuccess = true
            });
        }

        [HttpPost]
        public async Task<ActionResult<AuthDTO>> Login(LoginDTO login)
        {
            var testRes = await _userManager.FindByEmailAsync(login.Email);

            if (testRes == null)
            {
                return Unauthorized("Email not found!");
            }

            var checkPswrd = await _userManager.CheckPasswordAsync(testRes, login.Password);

            if (!checkPswrd)
            {
                return Unauthorized("Incorrect password!");
            }

            var token = await _authService.GenerateToken(testRes);

            return Ok(token);
        }
    }
}
