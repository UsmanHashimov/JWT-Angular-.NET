using Auth_Identity.DTOs;
using Auth_Identity.Models;
using Auth_Identity.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth_Identity.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        public readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        public UserController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IAuthService authService)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _authService = authService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Student")]
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
