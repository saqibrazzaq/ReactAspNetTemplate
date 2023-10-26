using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("UserAddress")]
    public class UserAddress
    {
        [Key]
        public int UserAddressId { get; set; }
        [Required]
        public int? AddressId { get; set; }
        [ForeignKey(nameof(AddressId))]
        public Address? Address { get; set; }
        [Required]
        public string? Username { get; set; }
        [ForeignKey(nameof(Username))]
        public AppIdentityUser? User { get; set; }
    }
}
