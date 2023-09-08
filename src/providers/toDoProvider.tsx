import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { State, reducer, toDoStore } from "../stores/toDoStore";
import { ToDoClient, ToDoItem } from "../controllers/todoController";

type ToDoItemsState = {
  items: ToDoItem[];
  loadCompleted: boolean;
  AddItem: (item: ToDoItem) => Promise<void>;
  CompleteItem: (id: number, completed: boolean) => Promise<void>;
  DeleteItem: (id: number) => Promise<void>;
};

const initialState: ToDoItemsState = {
  items: toDoStore,
  loadCompleted: false,
  AddItem: async () => {},
  CompleteItem: async () => {},
  DeleteItem: async () => {},
};

const initialLoadingState: State = {
  operating: false,
  initialLoadSucceeded: false,
  initialLoadFailed: false,
  succeeded: false,
  failed: false,
  itemList: [],
};

export const toDoClient = new ToDoClient("https://localhost:7025");

export const ToDoContext = createContext<ToDoItemsState>({
  ...initialState,
});

export const useToDoContext = () => useContext(ToDoContext);

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatcher] = useReducer(reducer, initialLoadingState);

  useEffect(() => {
    const GetInitialItems = async () => {
      dispatcher({ type: "operation_started" });
      try {
        const result: ToDoItem[] = await toDoClient.get();
        dispatcher({
          type: "initial_load_Succeeded",
          itemList: result,
        });
      } catch {
        dispatcher({ type: "initial_load_failed" });
      }
    };
    GetInitialItems();
  }, []);

  const AddItem = async (item: ToDoItem) => {
    dispatcher({ type: "operation_started" });
    try {
      const result: ToDoItem = await toDoClient.create(item);
      dispatcher({
        type: "add_item_succeeded",
        item: result,
      });
    } catch {
      dispatcher({ type: "operation_failed" });
    }
  };

  const CompleteItem = async (id: number, completed: Boolean) => {
    dispatcher({ type: "operation_started" });
    try {
      const result: boolean = await toDoClient.markCompleted(
        id,
        completed as boolean
      );
      dispatcher({
        type: "complete_item_succeeded",
        itemId: id,
        completed: result,
      });
    } catch {
      dispatcher({ type: "operation_failed" });
    }
  };

  const DeleteItem = async (id: number) => {
    dispatcher({ type: "operation_started" });
    try {
      await toDoClient.delete(id);
      dispatcher({
        type: "delete_item_succeeded",
        itemId: id,
      });
    } catch {
      dispatcher({ type: "operation_failed" });
    }
  };

  const toDoState: ToDoItemsState = {
    items: state.itemList,
    loadCompleted: state.initialLoadSucceeded && state.succeeded,
    AddItem: AddItem,
    CompleteItem: CompleteItem,
    DeleteItem: DeleteItem,
  };

  return (
    <ToDoContext.Provider value={toDoState}>{children}</ToDoContext.Provider>
  );
};
