using SimpleInvoicesProject.BAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;

namespace SimpleInvoicesProject.WebApp.Controllers;

public class InvoicesController : ApiController<Invoice,InvoiceDto,InvoiceDtoRequest,IInvoicesService>
{
    public InvoicesController(IInvoicesService service, IUriService uriService) : base(service, uriService)
    {
    }
}