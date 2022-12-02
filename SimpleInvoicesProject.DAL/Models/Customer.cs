
using System.ComponentModel.DataAnnotations;

namespace SimpleInvoicesProject.DAL.Models;

public class Customer
{
    [Key] public int CustomerId { get; set; }
    public string? CustomerName { get; set; }
    public string? PhoneNumber { get; set; }
    public IList<Invoice> Invoices { get; set; } = new List<Invoice>();
}