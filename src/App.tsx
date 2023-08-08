import "./App.css";
import React from "react";
import { ToDoProvider } from "./providers/toDoProvider";
import { Banner } from "./components/banner";

function App() {
  return (
    <ToDoProvider>
      <div className="App">
        <Banner title="To Do Items Tracker"></Banner>
      </div>
    </ToDoProvider>
  );
}

export default App;
