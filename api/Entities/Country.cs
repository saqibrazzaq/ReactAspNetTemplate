using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Country")]
    [Index(nameof(CountryCode), IsUnique = true)]
    [Index(nameof(CountryName), IsUnique = true)]
    public class Country
    {
        [Key]
        public int CountryId { get; set; }
        [Required]
        public string? CountryCode { get; set; }
        [Required]
        public string? CountryName { get; set; }

        // Child tables
        public IList<State>? States { get; set; }
    }
}
