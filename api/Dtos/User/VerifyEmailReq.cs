using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class VerifyEmailReq
    {
        [Required]
        public string? PinCode { get; set; }


    }
}
