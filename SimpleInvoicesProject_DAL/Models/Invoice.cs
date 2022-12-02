using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SimpleInvoicesProject_DAL.Enums;

namespace SimpleInvoicesProject_DAL.Models;

public class Invoice
{
    [Key] public int InvoiceId { get; set; }
    [ForeignKey("Customer")] public int CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public DateTime Date { get; set; }
    public double Value { get; set; }
    public InvoiceState State { get; set; }
}