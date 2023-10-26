using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Address
{
    public class AddressRes
    {
        public int AddressId { get; set; }
        public bool IsPrimary { get; set; } = false;
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public int? StateId { get; set; }
        public State? State { get; set; }
    }
}
