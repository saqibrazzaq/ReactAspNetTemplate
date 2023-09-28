using api.Data;
using api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.Implementations
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;
        private readonly Lazy<IUserRepository> _userRepository;

        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            // Initialize all repositories
            _userRepository = new Lazy<IUserRepository>(() =>
                new UserRepository(context));
        }

        public IUserRepository UserRepository => _userRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
