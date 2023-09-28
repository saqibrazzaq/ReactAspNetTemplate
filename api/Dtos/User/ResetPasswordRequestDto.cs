using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class ResetPasswordRequestDto
    {
        [Required]
        public string? ForgotPasswordToken { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(255, ErrorMessage = "Maximum 255 characters for Email")]
        [EmailAddress]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Minimum 6 characters for password")]
        public string? Password { get; set; }
        [Required(ErrorMessage = "Confirm Password is required")]
        [MinLength(6, ErrorMessage = "Minimum 6 characters for confirm password")]
        [Compare("Password", ErrorMessage = "Confirm password must match with password")]
        public string? ConfirmPassword { get; set; }
    }
}
