using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;
using SimpleInvoicesProject.DTOs.Filters;

namespace SimpleInvoicesProject.BAL.Interfaces;

public interface ICustomerService : IServiceBase<Customer, CustomerDto, CustomerDtoRequest>
{
    Task<IList<InvoiceDto>> CustomerInvoicesListAsync(int customerId, PaginationFilter? filter, string? search = "");
}