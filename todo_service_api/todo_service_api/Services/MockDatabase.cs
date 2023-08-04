namespace todo_service_api.Services;

public interface IMockDatabase
{
    IEnumerable<ToDoItem> Get();
    ToDoItem Patch(ToDoItem item);
    ToDoItem Create(ToDoItem item);
    IEnumerable<ToDoItem> Delete(int itemId);
}

public class MockDatabase : IMockDatabase
{
    private List<ToDoItem> Items { get; set; } = new List<ToDoItem>();

    public ToDoItem Create(ToDoItem item)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<ToDoItem> Delete(int itemId)
    {
        Items = Items
            .Where(c => c.Id != itemId)
            .ToList();
        return Items;
    }

    public IEnumerable<ToDoItem> Get()
    {
        return Items;
    }

    public ToDoItem Patch(ToDoItem item)
    {
        throw new NotImplementedException();
    }
}
