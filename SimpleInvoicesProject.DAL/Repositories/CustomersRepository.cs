using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using SimpleInvoicesProject.DAL.Database;
using SimpleInvoicesProject.DAL.Interfaces;
using SimpleInvoicesProject.DAL.Models;

namespace SimpleInvoicesProject.DAL.Repositories;

public class CustomersRepository : IRepositoryBase<Customer>
{
    private readonly AppDbContext _dbContext;

    public CustomersRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Customer> Create(Customer item)
    {
        await _dbContext.Customers.AddAsync(item);
        return item;
    }

    public async Task Delete(int id)
    {
        var target = await _dbContext.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
        if (target == null)
            throw new Exception("Target customer isn't available");
        _dbContext.Customers.Remove(target);
    }

    public async Task<Customer> Update(int id, Customer item)
    {
        var target = await _dbContext.Customers.AsNoTracking()
            .FirstOrDefaultAsync(c => c.CustomerId == id);
        if (target == null)
            throw new Exception("Target customer isn't available");
        item.CustomerId = id;
        target = item;
        _dbContext.Customers.Update(target);
        return target;
    }

    public async Task<IList<Customer>> List(Expression<Func<Customer, bool>>? predicate)
    {
        var list = await _dbContext.Customers.Where(predicate ?? (c => true)).ToListAsync();
        return list;
    }

    public async Task<Customer?> Single(int id)
    {
        var target = await _dbContext.Customers
            .FirstOrDefaultAsync(c => c.CustomerId == id);
        return target;
    }

    public async Task Complete()
    {
        await _dbContext.SaveChangesAsync();
    }
}