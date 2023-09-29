export interface State {
  loggingIn: boolean;
  loggedIn: boolean;
  username: string;
}

export interface NotLoggedIn {
  type: "not_logged_in";
}

export interface LoggingIn {
  type: "logging_in";
  username: string;
  password: string;
}

export interface LoggedIn {
  type: "logged_in";
  username: string;
}

export type Action = NotLoggedIn | LoggingIn | LoggedIn;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "not_logged_in":
      return { ...state, loggingIn: false, loggedIn: false, username: "" };
    case "logging_in":
      return { ...state, loggingIn: true, loggedIn: false, username: "" };
    case "logged_in":
      return { ...state, loggingIn: false, loggedIn: true };
  }
};
