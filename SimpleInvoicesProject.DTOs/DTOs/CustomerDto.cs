namespace SimpleInvoicesProject.DTOs.DTOs;

public class CustomerDto
{
     public int CustomerId { get; set; }
    public string? CustomerName { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastUpdate { get; set; }
}