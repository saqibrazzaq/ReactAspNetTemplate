using api.Dtos.Country;
using api.Services.Interfaces;
using api.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult CreateState(StateEditReq dto)
        {
            var res = _stateService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{stateId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult UpdateState(
            int stateId, StateEditReq dto)
        {
            var res = _stateService.Update(stateId, dto);
            return Ok(res);
        }

        [HttpDelete("{stateId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int stateId)
        {
            _stateService.Delete(stateId);
            return NoContent();
        }

        [HttpGet("{stateId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Get(int stateId)
        {
            var res = _stateService.Get(stateId);
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Search([FromQuery] StateSearchReq dto)
        {
            var res = _stateService.Search(dto);
            return Ok(res);
        }
    }
}
