using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleInvoicesProject.DAL.Database;
using SimpleInvoicesProject.DAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DAL.Repositories;

namespace SimpleInvoicesProject.DAL.DI;

public static class RegisterWithDependencyInject
{
    public static void RegisterDbContext<T>(this IServiceCollection services, IConfiguration configuration)
        where T : DbContext
    {
        services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(
            configuration.GetConnectionString("default")
        ));
    }

    public static void RegisterRepositories(this IServiceCollection services)
    {
        services.AddScoped<IRepositoryBase<Customer>, CustomersRepository>();
        services.AddScoped<IRepositoryBase<Invoice>, InvoicesRepository>();
        
    }
}
