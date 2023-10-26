using api.Dtos.Address;
using api.Entities;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAddressesController : ControllerBase
    {
        private readonly IUserAddressService _userAddressService;
        public UserAddressesController(IUserAddressService userAddressService)
        {
            _userAddressService = userAddressService;
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Create(UserAddressEditReq dto)
        {
            var res = _userAddressService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{userAddressId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Update(int userAddressId, UserAddressEditReq dto)
        {
            var res = _userAddressService.Update(userAddressId, dto);
            return Ok(res);
        }

        [HttpDelete("{userAddressId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Delete(int userAddressId)
        {
            _userAddressService.Delete(userAddressId);
            return NoContent();
        }

        [HttpGet("{userAddressId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Get(int userAddressId)
        {
            var res = _userAddressService.Get(userAddressId);
            return Ok(res);
        }

        [HttpGet("all")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult GetAll()
        {
            var res = _userAddressService.GetAll();
            return Ok(res);
        }
    }
}
