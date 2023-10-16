using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class RemoveRoleReq
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? RoleName { get; set; }
    }
}
