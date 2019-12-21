using System;

namespace DotNetCoreBack.DataTransmision
{
    public class ToDoSave
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string TaskName { get; set; }
        public bool Finish { get; set; }
    }
    public class ToDoReturn
    {        
        public string Username { get; set; }
        public string TaskName { get; set; }
        public bool Finish { get; set; }
        public string TaskDate { get; set; }
    }
}