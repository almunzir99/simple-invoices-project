using Microsoft.EntityFrameworkCore;
using SimpleInvoicesProject_DAL.Models;

namespace SimpleInvoicesProject_DAL.Database;

public class AppDbContext : DbContext
{
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Invoice> Invoices => Set<Invoice>();

    public AppDbContext(DbContextOptions options) : base(options)
    {
    }
    
}