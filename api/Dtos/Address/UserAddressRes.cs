using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using api.Dtos.User;

namespace api.Dtos.Address
{
    public class UserAddressRes
    {
        public int UserAddressId { get; set; }
        public int? AddressId { get; set; }
        public AddressRes? Address { get; set; }
        public string? Username { get; set; }
        public UserRes? User { get; set; }
    }
}
