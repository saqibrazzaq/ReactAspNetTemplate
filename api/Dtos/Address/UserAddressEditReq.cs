using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Address
{
    public class UserAddressEditReq
    {
        public int? AddressId { get; set; }
        public AddressEditReq? Address { get; set; }
        [Required]
        public string? UserId { get; set; }
    }
}
