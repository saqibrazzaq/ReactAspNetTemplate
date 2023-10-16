using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
    public class DeleteUserReq
    {
        [Required(ErrorMessage = "Username is required")]
        [MaxLength(50, ErrorMessage = "Maximum 50 characters for Username")]
        public string? Username { get; set; }

        public DeleteUserReq(string? username)
        {
            Username = username;
        }
    }
}
