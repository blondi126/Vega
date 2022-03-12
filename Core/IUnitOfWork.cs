namespace Vega.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}