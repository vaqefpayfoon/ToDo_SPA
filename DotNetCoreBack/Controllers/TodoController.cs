using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetCoreBack.Data;
using DotNetCoreBack.DataTransmision;
using DotNetCoreBack.Models;
using IranTalent.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _repo;
        private readonly IMapper _mapper;
        public TodoController(ITodoRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpPost("saveTodo")]
        public async Task<IActionResult> saveTodo(ToDoSave model)
        {            
            if (await _repo.Exists(model.TaskName))
                return BadRequest("Task already exists");

            ToDo toDo = _mapper.Map<ToDo>(model);
            toDo.TaskDate = DateTime.Now;
            if(model.Finish)
                toDo.FinishDate = DateTime.Now;
            _repo.Add(toDo);
            if (await _repo.SaveAll())
                return Ok(new {id = toDo.Id});

            throw new Exception($"Save Task {model.TaskName} failed on save");
        }
        [HttpPost("updateTodo")]
        public async Task<IActionResult> updateTodo(ToDoSave model)
        {
            var toDo = await _repo.GetToDo(model.Id);
            toDo.TaskName = model.TaskName;
            toDo.UserId = model.UserId;
            toDo.Finish = model.Finish;
            toDo.FinishDate = DateTime.Now;

            if (await _repo.SaveAll())
                return Ok(toDo);

            throw new Exception($"Updating toDo {model.Id} failed on save");
            
        }
        [HttpPost("deleteTodo")]
        public async Task<IActionResult> deleteTodo(StringModel name) 
        {        
            ToDo toDo = await _repo.GetToDo(name.Id);

            _repo.Delete(toDo);
            
            if (await _repo.SaveAll())
                return Ok();
                
            throw new Exception($"couldn't delete this Task");
        }
        [HttpGet("getTodo")]
        public async Task<IActionResult> getTodo(string key, string field) 
        {        
            ToDo toDo;
            if(field.Equals("name"))
                toDo = await _repo.GetToDo(key);
            else
                toDo = await _repo.GetToDo(Convert.ToInt32(key));
            return Ok(toDo);
        }
        [HttpGet("getTodos")]
        public async Task<IActionResult> getTodos() 
        {        
            IEnumerable<ToDo> toDo = await _repo.GetToDos();
            return Ok(toDo);
        }
        [HttpGet("getAllTodos")]
        public async Task<IActionResult> getAllTodos([FromQuery]UserParams userParams) 
        {        
            PagedList<ToDo> toDoPaged = await _repo.GetToDosProjects(userParams);
            var todo = _mapper.Map<IEnumerable<ToDoReturn>>(toDoPaged);
            Response.AddPagination(toDoPaged.CurrentPage, toDoPaged.PageSize,
                toDoPaged.TotalCount, toDoPaged.TotalPages);
            return Ok(todo);
        }
        [HttpGet("getUsers")]
        public async Task<IActionResult> getUsers() 
        {        
            IEnumerable<User> users = await _repo.GetUsers();
            IEnumerable<UserForDetail> userForDetails = _mapper.Map<IEnumerable<UserForDetail>>(users);
            return Ok(userForDetails);
        }
    }
}