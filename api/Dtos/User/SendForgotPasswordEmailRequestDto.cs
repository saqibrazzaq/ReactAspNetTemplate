using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class SendForgotPasswordEmailRequestDto
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(255, ErrorMessage = "Maximum 255 characters for Email")]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
