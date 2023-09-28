using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        // Foreign keys
        public int? AccountTypeId { get; set; }
        [ForeignKey(nameof(AccountTypeId))]
        public AccountType? AccountType { get; set; }
    }
}
