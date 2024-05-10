using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure
{
    internal static class Seed
    {
        public static async Task SeedData(DataContext context, RoleManager<IdentityRole<Guid>> roleManager)
        {
            foreach (UserRole roleEnum in Enum.GetValues(typeof(UserRole)))
            {
                string roleName = roleEnum.ToString(); 

                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    IdentityRole<Guid> role = new IdentityRole<Guid>(roleName);
                    await roleManager.CreateAsync(role);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
