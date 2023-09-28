using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class VerifyEmailRequestDto
    {
        [Required]
        public string? PinCode { get; set; }


    }
}
