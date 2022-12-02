using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;

namespace SimpleInvoicesProject.WebApp.Controllers;

public class CustomersController: ApiController<Customer,CustomerDto,CustomerDtoRequest,ICustomerService>
{
    public CustomersController(ICustomerService service, IUriService uriService) : base(service, uriService)
    {
    }
}