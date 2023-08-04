using Microsoft.AspNetCore.Mvc;

namespace todo_service_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        public ToDoController() {}

        [HttpGet]
        public IEnumerable<ToDoItem> Get()
        {
            return new List<ToDoItem>();
        }
    }
}