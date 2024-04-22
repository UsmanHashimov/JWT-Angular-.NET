using Auth_Identity.DTOs;
using Auth_Identity.Models;

namespace Auth_Identity.Services
{
    public interface IAuthService
    {
        public Task<AuthDTO> GenerateToken(User user);
    }
}
