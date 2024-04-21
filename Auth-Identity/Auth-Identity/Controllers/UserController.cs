using Auth_Identity.DTOs;
using Auth_Identity.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth_Identity.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly UserManager<User> _userManager;

        public readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult> Register(RegisterDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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
                return BadRequest(res.Errors);
            }

            foreach(var role in model.Roles)
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return Ok(res);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Login(LoginDTO login)
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

            return Ok("Welcome!");
        }

        [HttpGet]
        public async Task<ActionResult<User[]>> GetAllUsers()
        {
            var res = await _userManager.Users.ToListAsync();

            if (res == null)
            {
                return BadRequest();
            }

            return Ok(res);
        }
    }
}
