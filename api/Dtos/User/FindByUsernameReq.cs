using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class FindByUsernameReq
    {
        [Required(ErrorMessage = "Username is required")]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters for Username")]
        public string? Username { get; set; }
    }
}
