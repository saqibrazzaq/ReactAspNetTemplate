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
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public AppIdentityUser? User { get; set; }
    }
}
