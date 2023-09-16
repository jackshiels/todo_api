export interface State {
  loggingIn: boolean;
  loggedIn: boolean;
}

export interface NotLoggedIn {
  type: "not_logged_in";
}

export interface LoggingIn {
  type: "logging_in";
}

export interface LoggedIn {
  type: "logged_in";
}

export type Action = NotLoggedIn | LoggingIn | LoggedIn;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "not_logged_in":
      return { ...state, loggingIn: false, loggedIn: false };
    case "logging_in":
      return { ...state, loggingIn: true, loggedIn: false };
    case "logged_in":
      return { ...state, loggingIn: false, loggedIn: true };
  }
};
