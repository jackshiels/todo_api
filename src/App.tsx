import "./App.css";
import { ToDoProvider } from "./providers/toDoProvider";

function App() {
  return (
    <ToDoProvider>
      <div className="App">
        <header className="App-header"></header>
        <h2>To Do App</h2>
      </div>
    </ToDoProvider>
  );
}

export default App;
