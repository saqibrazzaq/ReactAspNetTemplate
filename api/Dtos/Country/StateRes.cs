using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Country
{
    public class StateRes
    {
        public int StateId { get; set; }
        public string? StateCode { get; set; }
        public string? StateName { get; set; }

        public int? CountryId { get; set; }
        public CountryRes? Country { get; set; }
    }
}
