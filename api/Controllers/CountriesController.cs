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
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;
        public CountriesController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpPost]
        [Authorize(Roles = Constants.SuperAdminRole)]
        public IActionResult Create(CountryEditReq dto)
        {
            var res = _countryService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{countryId}")]
        [Authorize(Roles = Constants.SuperAdminRole)]
        public IActionResult Update(int countryId, CountryEditReq dto)
        {
            var res = _countryService.Update(countryId, dto);
            return Ok(res);
        }

        [HttpDelete("{countryId}")]
        [Authorize(Roles = Constants.SuperAdminRole)]
        public IActionResult Delete(int countryId)
        {
            _countryService.Delete(countryId);
            return NoContent();
        }

        [HttpGet("{countryId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Get(int countryId)
        {
            var res = _countryService.Get(countryId);
            return Ok(res);
        }

        [HttpGet("{countryId}/get-with-state-count")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult GetWithStateCount(int countryId)
        {
            var res = _countryService.GetWithStateCount(countryId);
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize (Roles = Constants.AllRoles)]
        public IActionResult Search([FromQuery] CountrySearchReq dto)
        {
            var res = _countryService.Search(dto);
            return Ok(res);
        }

        [HttpGet("search-with-state-count")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult SearchWithStateCount([FromQuery] CountrySearchReq dto)
        {
            var res = _countryService.SearchWithStateCount(dto);
            return Ok(res);
        }

        
    }
}
