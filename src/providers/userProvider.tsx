import React, { createContext, useReducer, useContext } from "react";
import { State, reducer } from "../stores/userStore";
import { ToDoClient } from "../controllers/todoController";
import UserApiClient from "../auth/userApiClient";
import { AuthManager } from "../auth/authManager";

export type UserLoginState = {
  loggedIn: boolean;
  username: string | null;
  attemptLogin: (username: string, password: string) => Promise<boolean>;
  attemptLogout: () => void;
};

const initialState: UserLoginState = {
  loggedIn: false,
  username: null,
  attemptLogin: async () => {
    return false;
  },
  attemptLogout: async () => {
    return false;
  },
};

const initialLoadingState: State = {
  loggedIn: false,
  loggingIn: false,
  username: "",
};

export const toDoClient = new ToDoClient("https://localhost:7025");

export const UserLoginContext = createContext<UserLoginState>({
  ...initialState,
});

export const useUserContext = () => useContext(UserLoginContext);

export const UserLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatcher] = useReducer(reducer, initialLoadingState);

  const attemptLogin = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    dispatcher({
      type: "logging_in",
      username: username,
      password: password,
    });
    try {
      const result = await UserApiClient({
        UserName: username,
        Password: password,
      });
      if (result) {
        dispatcher({ type: "logged_in", username: username });
        return true;
      }
      return false;
    } catch {
      dispatcher({ type: "not_logged_in" });
      return false;
    }
  };

  const Logout = () => {
    AuthManager.getInstance().SetToken("");
  };

  const loginState: UserLoginState = {
    attemptLogin: attemptLogin,
    attemptLogout: Logout,
    loggedIn: state.loggedIn,
    username: state.username,
  };

  console.log("initialised user provider");

  return (
    <UserLoginContext.Provider value={loginState}>
      {children}
    </UserLoginContext.Provider>
  );
};
