using SimpleInvoicesProject.DAL.Models;
using SimpleInvoicesProject.DTOs.DTOs;
using SimpleInvoicesProject.DTOs.DTOsRequests;

namespace SimpleInvoicesProject.BAL.Interfaces;

public interface IInvoicesService: IServiceBase<Invoice, InvoiceDto, InvoiceDtoRequest>
{
    
}