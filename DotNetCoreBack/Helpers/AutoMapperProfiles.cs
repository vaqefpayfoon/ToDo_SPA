using System.Linq;
using AutoMapper;
using DotNetCoreBack.DataTransmision;
using DotNetCoreBack.Models;

namespace IranTalent.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegister, User>();
            CreateMap<User, UserForDetail>();

            CreateMap<ToDoSave, ToDo>();
            CreateMap<ToDo, ToDoReturn>().ForMember(des => des.Username, opt => {
                opt.MapFrom(woak => woak.User.Username);
            });
        }
    }
}