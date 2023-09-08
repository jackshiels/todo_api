import { ToDoItem } from "../controllers/todoController";

export const toDoStore: ToDoItem[] = [];

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "initial_load_Succeeded":
      return {
        ...state,
        operating: false,
        succeeded: true,
        initialLoadFailed: false,
        initialLoadSucceeded: true,
        itemList: action.itemList,
      };
    case "initial_load_failed":
      return {
        ...state,
        operating: false,
        initialLoadFailed: true,
        initialLoadSucceeded: false,
        itemList: [],
      };
    case "add_item_succeeded":
      return {
        ...state,
        succeeded: true,
        failed: false,
        itemList: [...state.itemList, action.item],
      };
    case "delete_item_succeeded":
      return {
        ...state,
        succeeded: true,
        failed: false,
        itemList: state.itemList.filter((c) => c.id !== action.itemId),
      };
    case "complete_item_succeeded":
      (
        state.itemList.find((c) => c.id === action.itemId) as ToDoItem
      ).completed = action.completed;
      return {
        ...state,
        succeeded: true,
        failed: false,
      };
    case "operation_started":
      return {
        ...state,
        operating: true,
        succeeded: false,
        failed: false,
      };
    case "operation_failed":
      return {
        ...state,
        operating: false,
        succeeded: false,
        failed: true,
      };
  }
};

export interface State {
  initialLoadSucceeded: boolean;
  initialLoadFailed: boolean;
  operating: boolean;
  failed: boolean;
  succeeded: boolean;
  itemList: ToDoItem[];
}

// Per-operation versions instead
interface OperationStarted {
  type: "operation_started";
}

interface OperationFailed {
  type: "operation_failed";
}

interface InitialLoadSucceeded {
  type: "initial_load_Succeeded";
  itemList: ToDoItem[];
}

interface InitialLoadFailed {
  type: "initial_load_failed";
}

interface AddItemSucceeded {
  type: "add_item_succeeded";
  item: ToDoItem;
}

interface DeleteItemSucceeded {
  type: "delete_item_succeeded";
  itemId: number;
}

interface CompleteItemSucceeded {
  type: "complete_item_succeeded";
  itemId: number;
  completed: boolean;
}

export type Action =
  | InitialLoadSucceeded
  | InitialLoadFailed
  | AddItemSucceeded
  | DeleteItemSucceeded
  | CompleteItemSucceeded
  | OperationStarted
  | OperationFailed;
