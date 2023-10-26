using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Address")]
    public class Address
    {
        [Key]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; } = false;
        [Required]
        public string? FullName { get; set; }
        [Required]
        public string? Phone { get; set; }
        [Required]
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public int? StateId { get; set; }
        [ForeignKey(nameof(StateId))]
        public State? State { get; set; }
    }
}
