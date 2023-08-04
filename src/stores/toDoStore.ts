import { ToDoItem } from "../controllers/todoController";

export const toDoStore: ToDoItem[] = [];

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initial_loading":
      return {
        ...state,
        initialLoading: true,
        initialLoadFailed: false,
        initialLoadSucceeded: false,
        itemList: [],
      };
    case "initial_load_Succeeded":
      return {
        ...state,
        initialLoading: false,
        initialLoadFailed: false,
        initialLoadSucceeded: true,
        itemList: action.itemList,
      };
    case "initial_load_failed":
      return {
        ...state,
        initialLoading: false,
        initialLoadFailed: true,
        initialLoadSucceeded: false,
        itemList: [],
      };
    case "adding_item":
      return {
        ...state,
        succeeded: false,
        failed: false,
        addingItem: true,
        itemList: action.itemList,
      };
    case "deleting_item":
      return {
        ...state,
        succeeded: false,
        failed: false,
        deletingItem: true,
        itemList: action.itemList,
      };
    case "succeeded":
      return {
        ...state,
        succeeded: true,
        failed: false,
        deletingItem: false,
        addingItem: false,
        itemList: action.itemList,
      };
    case "failed":
      return {
        ...state,
        succeeded: false,
        failed: true,
        deletingItem: false,
        addingItem: false,
        itemList: action.itemList,
      };
  }
};

export interface State {
  initialLoading: Boolean;
  initialLoadSucceeded: Boolean;
  initialLoadFailed: Boolean;
  addingItem: Boolean;
  deletingItem: Boolean;
  failed: Boolean;
  succeeded: Boolean;
  itemList: ToDoItem[];
}

interface InitialLoading {
  type: "initial_loading";
}

interface InitialLoadSucceeded {
  type: "initial_load_Succeeded";
  itemList: ToDoItem[];
}

interface InitialLoadFailed {
  type: "initial_load_failed";
}

interface AddingItem {
  type: "adding_item";
  itemList: ToDoItem[];
}

interface DeletingItem {
  type: "deleting_item";
  itemList: ToDoItem[];
}

interface Succeeded {
  type: "succeeded";
  itemList: ToDoItem[];
}

interface Failed {
  type: "failed";
  itemList: ToDoItem[];
}

export type Action =
  | InitialLoading
  | InitialLoadSucceeded
  | InitialLoadFailed
  | AddingItem
  | DeletingItem
  | Succeeded
  | Failed;
