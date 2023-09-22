import "./App.css";
import React from "react";
import { AuthManager } from "./auth/authManager";
import { ToDoProvider } from "./providers/toDoProvider";
import { Banner } from "./components/banner";
import { Outlet } from "react-router-dom";
import { LoginWindow } from "./login/loginWindow";
import { UserLoginProvider } from "./providers/userProvider";

const authManager: AuthManager = AuthManager.getInstance();

function App() {
  return authManager.CheckIfLoggedIn() ? (
    <UserLoginProvider>
      <ToDoProvider>
        <div className="App">
          <Banner title="To Do Items Tracker"></Banner>
          <Outlet />
        </div>
      </ToDoProvider>
    </UserLoginProvider>
  ) : (
    <UserLoginProvider>
      <ToDoProvider>
        <div className="App">
          <Banner title="To Do Items Tracker"></Banner>
          <LoginWindow />
        </div>
      </ToDoProvider>
    </UserLoginProvider>
  );
}

export default App;
