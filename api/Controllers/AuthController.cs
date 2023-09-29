﻿using api.Common;
using api.Common.ActionFilters;
using api.Dtos.User;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register-owner")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Register(
            [FromBody] RegisterRequestDto dto)
        {
            await _userService.RegisterOwner(dto);
            return Ok();
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            var res = await _userService.Login(dto);
            setRefreshTokenCookie(res.RefreshToken);
            return Ok(res);
        }

        [HttpPost("refresh-token")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RefreshToken(
            [FromBody] TokenDto dto)
        {
            dto.RefreshToken = Request.Cookies[Constants.RefreshTokenCookieName];
            var res = await _userService.RefreshToken(dto);
            setRefreshTokenCookie(res.RefreshToken);

            return Ok(res);
        }

        private void setRefreshTokenCookie(string? refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(int.Parse(
                    SecretUtility.JWTRefreshTokenValidityInDays)),
                SameSite = SameSiteMode.None,
                Secure = true
            };

            // Delete the refresh token cookie, if no token is passed
            if (string.IsNullOrEmpty(refreshToken))
            {
                Response.Cookies.Delete(Constants.RefreshTokenCookieName);
            }
            else
            {
                // Set the refresh token cookie
                Response.Cookies.Append(Constants.RefreshTokenCookieName,
                    refreshToken, cookieOptions);
            }

        }
    }
}