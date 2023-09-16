import React, { createContext, useReducer } from "react";
import { State, reducer } from "../stores/userStore";

type UserLoginState = {
  loggedIn: boolean;
  username: string | null;
  roles: string[] | null;
};

const initialState: UserLoginState = {
  loggedIn: false,
  username: null,
  roles: null,
};

const initialLoadingState: State = {
  loggedIn: false,
  loggingIn: false,
};

export const UserLoginContext = createContext<UserLoginState>({
  ...initialState,
});

export const UserLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatcher] = useReducer(reducer, initialLoadingState);
};
