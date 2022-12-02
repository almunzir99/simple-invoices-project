using SimpleInvoicesProject.DAL.Enums;

namespace SimpleInvoicesProject.DTOs.DTOs;

public class InvoiceDto
{
    public int InvoiceId { get; set; }
    public int CustomerId { get; set; }
    public CustomerDto? Customer { get; set; }
    public DateTime Date { get; set; }
    public double Value { get; set; }
    public InvoiceState State { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdate { get; set; }
}