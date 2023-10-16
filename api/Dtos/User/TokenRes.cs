using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dtos.User
{
    public class TokenRes
    {
        [Required(ErrorMessage = "Access token is required")]
        public string? AccessToken { get; set; }
        //[JsonIgnore]
        public string? RefreshToken { get; set; }
    }
}
