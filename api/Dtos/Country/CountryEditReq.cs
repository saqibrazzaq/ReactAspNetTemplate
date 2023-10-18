using api.Entities;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Country
{
    public class CountryEditReq
    {
        [Required]
        public string? CountryCode { get; set; }
        [Required]
        public string? CountryName { get; set; }
    }
}
