import "./App.css";
import React from "react";
import { ToDoProvider } from "./providers/toDoProvider";
import { Banner } from "./components/banner";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ToDoProvider>
      <div className="App">
        <Banner title="To Do Items Tracker"></Banner>
        <Outlet />
      </div>
    </ToDoProvider>
  );
}

export default App;
