using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class ChangePasswordReq
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(255, ErrorMessage = "Maximum 255 characters for Email")]
        [EmailAddress]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Current Password is required")]
        [MinLength(6, ErrorMessage = "Minimum 6 characters for password")]
        public string? CurrentPassword { get; set; }

        [Required(ErrorMessage = "New Password is required")]
        [MinLength(6, ErrorMessage = "Minimum 6 characters for New password")]
        public string? NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        [MinLength(6, ErrorMessage = "Minimum 6 characters for confirm password")]
        [Compare("NewPassword", ErrorMessage = "Confirm password must match with New password")]
        public string? ConfirmNewPassword { get; set; }
    }
}
