using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using todo_service_api.Services;

namespace todo_service_api.Controllers
{
    [ApiController]
    [Authorize("api")]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private IMockDatabase MockDatabase { get; }

        public ToDoController(IMockDatabase mockDatabase)
        {
            MockDatabase = mockDatabase;
        }

        [HttpGet]
        public IEnumerable<ToDoItem> Get()
        {
            return MockDatabase.Get();
        }

        [HttpPatch]
        public ToDoItem Patch(ToDoItem item)
        {
            return MockDatabase.Patch(item);
        }

        [HttpPatch("markComplete")]
        public bool MarkCompleted(int id, bool complete)
        {
            ToDoItem item = MockDatabase.GetById(id);
            item.Completed = complete;
            MockDatabase.Patch(item);
            return !complete;
        }

        [HttpPost]
        public ToDoItem Create(ToDoItem item) 
        { 
            return MockDatabase.Create(item);
        }

        [HttpDelete]
        public IEnumerable<ToDoItem> Delete(int id)
        {
            return MockDatabase.Delete(id);
        }
    }
}