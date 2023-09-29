namespace todo_service_api.Services;

public interface IMockDatabase
{
    IEnumerable<ToDoItem> Get();
    ToDoItem GetById(int id);
    ToDoItem Patch(ToDoItem item);
    ToDoItem Create(ToDoItem item);
    IEnumerable<ToDoItem> Delete(int itemId);
    User? GetUser(string username, string password);
}

public class MockDatabase : IMockDatabase
{
    private readonly List<User> users = new()
    {
        new() 
        { 
            Username = "jacks@revelat.io", 
            Password = "sjcrsjcr",
            Role = "api"
        }
    };

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
        Thread.Sleep(2000);
        var maxId = Items.Any() 
            ? Items.Select(x => x.Id).Max() 
            : 0;
        item.Id = maxId + 1;
        item.TimeStamp = DateTime.Now;
        Items.Add(item);
        return item;
    }

    public IEnumerable<ToDoItem> Delete(int itemId)
    {
        Thread.Sleep(2000);
        Items = Items
            .Where(c => c.Id != itemId)
            .ToList();
        return Items;
    }

    public IEnumerable<ToDoItem> Get()
    {
        Thread.Sleep(2000);
        return Items;
    }

    public ToDoItem GetById(int id)
    {
        return Items.First(c => c.Id == id);
    }

    public ToDoItem Patch(ToDoItem item)
    {
        Thread.Sleep(2000);
        var itemToReplace = Items.First(c => c.Id == item.Id);
        itemToReplace.Completed = item.Completed;
        return itemToReplace;
    }

    public User? GetUser(string username, string password)
    {
        return users.FirstOrDefault(c =>
        c.Username == username &&
        c.Password == password);
    }
}
