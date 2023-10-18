using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("State")]
    public class State
    {
        [Key]
        public int StateId { get; set; }
        [Required]
        public string? StateCode { get; set; }
        [Required]
        public string? StateName { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }
    }
}
