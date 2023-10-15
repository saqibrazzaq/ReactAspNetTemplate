using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class AddRoleRequestDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? RoleName { get; set; }
    }
}
