using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInvoicesProject_DAL.Database;

namespace SimpleInvoicesProject_DAL.DI;

public static class RegisterWithDependencyInject
{
    public static void RegisterDbContext<T>(this IServiceCollection services, IConfiguration configuration)
        where T : DbContext
    {
        services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(
            configuration.GetConnectionString("default")
        ));
    }
}