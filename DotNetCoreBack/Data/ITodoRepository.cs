using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetCoreBack.Models;
using IranTalent.Helpers;

namespace DotNetCoreBack.Data
{
    public interface ITodoRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<bool> Exists(string name);
        Task<ToDo> GetToDo(string name);
        Task<ToDo> GetToDo(int id);
        Task<IEnumerable<ToDo>> GetToDos();
        Task<IEnumerable<User>> GetUsers();
        Task<PagedList<ToDo>> GetToDosProjects(UserParams userParams);
    }
}