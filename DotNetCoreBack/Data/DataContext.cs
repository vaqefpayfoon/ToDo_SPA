using DotNetCoreBack.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetCoreBack.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext>  options) : base (options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ToDo>()
                .HasOne(u => u.User)
                .WithMany(u => u.ToDos)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}