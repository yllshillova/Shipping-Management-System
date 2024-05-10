using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Repositories
{
    internal sealed class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(DataContext context, UserManager<AppUser> userManager, ILogger<UserRepository> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _userManager.Users
                .FirstOrDefaultAsync(user => user.Email == email);
        }

        public bool IsEmailTaken(string email)
        {
            return _context.Users.Any(user => user.Email == email);
        }
        public bool IsUsernameTaken(string username)
        {
            return _context.Users.Any(user => user.UserName == username);
        }
        public async Task<bool> CreateUserAsync(AppUser user, string password)
        {
            if (string.IsNullOrEmpty(user.Email))
            {
                _logger.LogError("Email is empty or null.");
                return false;
            }
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            { 
                foreach (var error in result.Errors)
                {
                    _logger.LogError($"Error Code: {error.Code}, Description: {error.Description}");
                }
                return false;
            }
            return true;
        }
        public async Task<bool> AddToRoleAsync(AppUser user, string role)
        {
            var result = await _userManager.AddToRoleAsync(user, role);
            if (result.Succeeded) return true;
            return false;
        }

        public async Task<bool> ValidatePasswordAsync(AppUser user, string password)
        {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}
