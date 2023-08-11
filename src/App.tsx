import "./App.css";
import React from "react";
import { ToDoProvider } from "./providers/toDoProvider";
import { Banner } from "./components/banner";
import { TodoBody } from "./components/todoBody";

function App() {
  return (
    <ToDoProvider>
      <div className="App">
        <Banner title="To Do Items Tracker"></Banner>
        <TodoBody />
      </div>
    </ToDoProvider>
  );
}

export default App;
