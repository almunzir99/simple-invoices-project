using Microsoft.Extensions.DependencyInjection;
using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.BAL.Services;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;

namespace SimpleInvoicesProject.BAL.DI;

public static class RegisterWithDependencyInjection
{
    public static void RegisterRequiredServices(this IServiceCollection services)
    {
        services.AddScoped<ICustomerService, CustomersService>();
        services.AddScoped<IInvoicesService, InvoicesService>();
    }
    public static void ImplementUriService(this IServiceCollection services,
        Func<IServiceProvider, IUriService> implementationFactory)
    {
        services.AddScoped<IUriService>(implementationFactory);
    }
}