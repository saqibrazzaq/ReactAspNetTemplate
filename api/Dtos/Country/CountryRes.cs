using api.Entities;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Country
{
    public class CountryRes
    {
        public int CountryId { get; set; }
        public string? CountryCode { get; set; }
        public string? CountryName { get; set; }

        // Child tables
        public IList<StateRes>? States { get; set; }
    }
}
