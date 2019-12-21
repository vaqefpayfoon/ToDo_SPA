using System.Collections.Generic;

namespace DotNetCoreBack.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public ICollection<ToDo> ToDos { get; set; }
    }
}