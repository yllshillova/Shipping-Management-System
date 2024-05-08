using Domain.Base;
using Domain.Enums;

namespace Domain.Entities
{
    public class AppUser : EntityBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
    }
}
