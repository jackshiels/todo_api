namespace todo_service_api
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime TimeStamp { get; set; }
        public bool Completed { get; set; }
    }
}