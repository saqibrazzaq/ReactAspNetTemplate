using api.Common.ActionFilters;
using api.Dtos.User;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("verify-email")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailReq dto)
        {
            await _userService.VerifyEmail(dto);
            return Ok();
        }

        [HttpGet("send-verification-email")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> SendVerificationEmail()
        {
            await _userService.SendVerificationEmail();
            return Ok("Verification email sent.");
        }

        [HttpPost("update-profile-picture")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> UpdateProfilePicture()
        {
            await _userService.UpdateProfilePicture(Request.Form.Files[0]);
            return NoContent();
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> SearchUsers(
            [FromQuery] SearchUsersReq dto)
        {
            var res = await _userService.SearchUsers(
                dto, trackChanges: false);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateUser(
            [FromBody] CreateUserReq dto)
        {
            await _userService.CreateUser(dto);
            return Ok();
        }

        [HttpPost("add-role")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> AddRoleToUser(
            [FromBody] AddRoleReq dto)
        {
            await _userService.AddRoleToUser(dto);
            return Ok();
        }

        [HttpDelete("remove-role")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RemoveRoleFromUser(
            [FromBody] RemoveRoleReq dto)
        {
            await _userService.RemoveRoleFromUser(dto);
            return Ok();
        }

        [HttpDelete("{username}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> DeleteUser(
            string username)
        {
            await _userService.Delete(new DeleteUserReq(
                username));
            return Ok();
        }

        [HttpGet("get/{username}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> GetUser(
            string username)
        {
            var res = await _userService.FindByUsername(username);
            return Ok(res);
        }

        [HttpGet("roles")]
        [Authorize(Roles =Constants.AllAdminRoles)]
        public IActionResult GetAllRoles()
        {
            var res = _userService.GetAllRoles();
            return Ok(res);
        }
    }
}
