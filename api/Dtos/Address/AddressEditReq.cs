using api.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Address
{
    public class AddressEditReq
    {
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
        
    }
}
