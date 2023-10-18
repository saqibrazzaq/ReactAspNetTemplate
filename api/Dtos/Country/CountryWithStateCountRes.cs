using api.Entities;

namespace api.Dtos.Country
{
    public class CountryWithStateCountRes
    {
        public int CountryId { get; set; }
        public string? CountryCode { get; set; }
        public string? CountryName { get; set; }

        public int StateCount { get; set; } = 0;
    }
}
