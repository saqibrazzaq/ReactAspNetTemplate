using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    public class AppIdentityUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public string? EmailVerificationToken { get; set; }
        public DateTime? EmailVerificationTokenExpiryTime { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? ProfilePictureCloudinaryId { get; set; }
        public string FullName { get; set; } = "";

        // Foreign keys
        public int? AccountId { get; set; }
        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }

    }
}
