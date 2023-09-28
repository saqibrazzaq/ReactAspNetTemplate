using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("AccountType")]
    public class AccountType
    {
        [Key]
        public int AccountTypeId { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
