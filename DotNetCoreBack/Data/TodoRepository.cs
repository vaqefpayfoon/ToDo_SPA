using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DotNetCoreBack.Models;
using IranTalent.Helpers;
using Microsoft.EntityFrameworkCore;

namespace DotNetCoreBack.Data
{
    public class TodoRepository : ITodoRepository
    {
        private DataContext _context;
        public TodoRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> Exists(string name)
        {
            if (await _context.ToDos.AnyAsync(x => x.TaskName == name))
                return true;
            return false;
        }

        public async Task<ToDo> GetToDo(string name)
        {
            return await _context.ToDos.FirstOrDefaultAsync(woak => woak.TaskName == name);
        }

        public async Task<ToDo> GetToDo(int id)
        {
            return await _context.ToDos.FindAsync(id);
        }

        public async Task<IEnumerable<ToDo>> GetToDos()
        {
            return await _context.ToDos.ToListAsync();
        }
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<PagedList<ToDo>> GetToDosProjects(UserParams userParams)
        {            
            IQueryable<ToDo> results = _context.ToDos.Include(u => u.User).AsQueryable();
            return await PagedList<ToDo>.CreateAsync(results, userParams.PageNumber, userParams.PageSize);
        }
    }
}