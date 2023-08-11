namespace todo_service_api.Services;

public interface IMockDatabase
{
    IEnumerable<ToDoItem> Get();
    ToDoItem GetById(int id);
    ToDoItem Patch(ToDoItem item);
    ToDoItem Create(ToDoItem item);
    IEnumerable<ToDoItem> Delete(int itemId);
}

public class MockDatabase : IMockDatabase
{
    private List<ToDoItem> Items { get; set; } = new()
    {
        new ToDoItem()
        {
            Id = 1,
            Name = "test 1",
            Description = "test 1",
            TimeStamp = DateTime.Now,
            Completed = false
        },
        new ToDoItem()
        {
            Id = 2,
            Name = "test 2",
            Description = "test 2",
            TimeStamp = DateTime.Now,
            Completed = false
        },
        new ToDoItem()
        {
            Id = 3,
            Name = "test 3",
            Description = "test 3",
            TimeStamp = DateTime.Now,
            Completed = false
        },
    };

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
        Thread.Sleep(3000);
        return Items;
    }

    public ToDoItem GetById(int id)
    {
        return Items.First(c => c.Id == id);
    }

    public ToDoItem Patch(ToDoItem item)
    {
        var itemToReplace = Items.First(c => c.Id == item.Id);
        itemToReplace.Completed = item.Completed;
        return itemToReplace;
    }
}
