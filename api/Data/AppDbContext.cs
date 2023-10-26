using api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        // Tables in Database context
        public new DbSet<AppIdentityUser>? Users { get; set; }
        public DbSet<Account>? Accounts { get; set; }
        public DbSet<AccountType>? AccountTypes { get; set; }
        public DbSet<Country>? Countries { get; set; }
        public DbSet<State>? States { get; set; }
        public DbSet<Address>? Addresses { get; set; }
        public DbSet<UserAddress>? UserAddresses { get; set; }
    }
}
