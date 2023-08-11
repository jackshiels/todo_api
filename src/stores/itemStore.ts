export interface State {
  completed: boolean;
}

export interface ItemIncomplete {
  type: "incomplete";
  complete: false;
}

export interface ItemComplete {
  type: "complete";
  complete: true;
}

export type Action = ItemIncomplete | ItemComplete;

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "incomplete":
      return { ...state, completed: false };
    case "complete":
      return { ...state, completed: true };
  }
};
