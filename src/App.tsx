import "./App.css";
import React from "react";
import { AuthManager } from "./auth/authManager";
import { ToDoProvider } from "./providers/toDoProvider";
import { Banner } from "./components/banner";
import { Outlet } from "react-router-dom";
import { LoginWindow } from "./login/loginWindow";

const authManager: AuthManager = AuthManager.getInstance();

function App() {
  return authManager.CheckIfLoggedIn() ? (
    <ToDoProvider>
      <div className="App">
        <Banner title="To Do Items Tracker"></Banner>
        <Outlet />
      </div>
    </ToDoProvider>
  ) : (
    <ToDoProvider>
      <div className="App">
        <Banner title="To Do Items Tracker"></Banner>
        <LoginWindow />
      </div>
    </ToDoProvider>
  );
}

export default App;
