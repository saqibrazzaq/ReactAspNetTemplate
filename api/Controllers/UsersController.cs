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
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequestDto dto)
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
            [FromQuery] SearchUsersRequestDto dto)
        {
            var res = await _userService.SearchUsers(
                dto, trackChanges: false);
            return Ok(res);
        }
    }
}
