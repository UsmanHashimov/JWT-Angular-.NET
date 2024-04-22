using Auth_Identity.DTOs;
using Auth_Identity.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Auth_Identity.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ResponceDTO>> CreateRole(RoleDTO role)
        {
            var res = await _roleManager.FindByNameAsync(role.RoleName);

            if (res == null)
            {
                await _roleManager.CreateAsync(new IdentityRole(role.RoleName));
                return Ok(new ResponceDTO
                {
                    Message = "Role created!!!",
                    isSuccess = true,
                    StatusCode = 201
                });
            }

            return BadRequest(new ResponceDTO
            {
                Message = "Role cannot created",
                StatusCode = 403
            });
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<IdentityRole>>> GetAllRoles()
        {
            var roles = await _roleManager.Roles.ToListAsync();

            return Ok(roles);
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ResponceDTO>> DeleteRole(string name)
        {
            var res = await _roleManager.FindByNameAsync(name);

            if (res == null)
            {
                return BadRequest(new ResponceDTO { 
                    Message = "Role not found",
                    StatusCode = 404,
                    isSuccess = false
                });
            }

            await _roleManager.DeleteAsync(res);

            return Ok(new ResponceDTO
            {
                Message = "Role succesfully deleted!!",
                StatusCode = 200,
                isSuccess = true
            });
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ResponceDTO>> UpdateRole(string name, RoleDTO newRole)
        {
            var res = await _roleManager.FindByNameAsync(name);

            if (res == null)
            {
                return BadRequest(new ResponceDTO
                {
                    Message = "Role not found",
                    StatusCode = 404,
                    isSuccess = false
                });
            }

            await _roleManager.UpdateAsync(new IdentityRole(newRole.RoleName));

            return Ok(new ResponceDTO
            {
                Message = "Role updated",
                StatusCode = 200,
                isSuccess = true
            });
        }
    }
}
