using System;

namespace DotNetCoreBack.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public DateTime TaskDate { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public bool Finish { get; set; }
        public DateTime FinishDate { get; set; }
    }
}