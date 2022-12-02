using SimpleInvoicesProject.DAL.Enums;

namespace SimpleInvoicesProject.DTOs.DTOsRequests;

public class InvoiceDtoRequest
{
    public int CustomerId { get; set; }
    public DateTime Date { get; set; }
    public double Value { get; set; }
    public InvoiceState State { get; set; }
}