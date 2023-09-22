import React, { createContext, useReducer, useEffect } from "react";
import { State, reducer } from "../stores/userStore";
import { ToDoClient } from "../controllers/todoController";

type UserLoginState = {
  loggedIn: boolean;
  username: string | null;
  roles: string[] | null;
  attemptLogin: (username: string, password: string) => Promise<boolean>;
  attemptLogout: () => Promise<boolean>;
};

const initialState: UserLoginState = {
  loggedIn: false,
  username: null,
  roles: null,
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
};

export const toDoClient = new ToDoClient("https://localhost:7025");

export const UserLoginContext = createContext<UserLoginState>({
  ...initialState,
});

export const UserLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatcher] = useReducer(reducer, initialLoadingState);

  useEffect(() => {
    const attemptLogin = async (username: string, password: string) => {
      dispatcher({
        type: "logging_in",
        username: username,
        password: password,
      });
      try{
        const result: 
      }
      catch{

      }
    };
  });

  return (
    <UserLoginContext.Provider value={initialState}>
      {children}
    </UserLoginContext.Provider>
  );
};
