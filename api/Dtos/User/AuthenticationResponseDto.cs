using System.Text.Json.Serialization;

namespace api.Dtos.User
{
    public class AuthenticationResponseDto
    {
        public string? Email { get; set; }
        public IEnumerable<string>? Roles { get; set; }
        public string? AccessToken { get; set; }
        public bool EmailConfirmed { get; set; } = false;
        public Guid? AccountId { get; set; }

        [JsonIgnore]
        public string? RefreshToken { get; set; }
    }
}
