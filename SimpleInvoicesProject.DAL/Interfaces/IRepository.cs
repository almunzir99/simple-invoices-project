using System.Linq.Expressions;

namespace SimpleInvoicesProject.DAL.Interfaces;

public interface IRepositoryBase<T> where  T: class, new()
{
    public Task<T> Create(T item);
    public Task Delete(int id);
    public Task<T> Update(int id,T item);
    public Task<IList<T>> List(Expression<Func<T, bool>>? predicate);
    public Task<T?> Single(int id);
    public Task Complete();
}