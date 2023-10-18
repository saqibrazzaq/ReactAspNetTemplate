using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Country
{
    public class StateEditReq
    {
        [Required]
        public string? StateCode { get; set; }
        [Required]
        public string? StateName { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
    }
}
