using System.Text.Json.Serialization;

namespace api.Dtos.User
{
    public class AuthenticationResponseDto
    {
        public string FullName { get; set; } = "";
        public string? Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public IEnumerable<string>? Roles { get; set; }
        public string? AccessToken { get; set; }
        public bool EmailConfirmed { get; set; } = false;
        public int? AccountId { get; set; }

        //[JsonIgnore]
        public string? RefreshToken { get; set; }
    }
}
