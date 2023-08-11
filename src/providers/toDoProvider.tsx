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
  initialLoading: true,
  initialLoadSucceeded: false,
  initialLoadFailed: false,
  addingItem: false,
  completingItem: false,
  deletingItem: false,
  succeeded: false,
  failed: false,
  itemList: [],
};

export const ToDoContext = createContext<ToDoItemsState>({
  ...initialState,
});

export const useToDoContext = () => useContext(ToDoContext);

export const ToDoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatcher] = useReducer(reducer, initialLoadingState);

  useEffect(() => {
    const GetInitialItems = async () => {
      dispatcher({ type: "initial_loading" });
      try {
        const result: ToDoItem[] = await new ToDoClient(
          "https://localhost:7025"
        ).get();
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
    dispatcher({ type: "adding_item", itemList: state.itemList });
    try {
      const result: ToDoItem = await new ToDoClient(
        "https://localhost:7025"
      ).create(item);
      dispatcher({
        type: "succeeded",
        itemList: [...state.itemList, result],
      });
    } catch {
      dispatcher({ type: "failed", itemList: state.itemList });
    }
  };

  const CompleteItem = async (id: number, completed: Boolean) => {
    dispatcher({ type: "adding_item", itemList: state.itemList });
    try {
      const result: boolean = await new ToDoClient(
        "https://localhost:7025"
      ).markCompleted(id, completed as boolean);
      (state.itemList.find((c) => c.id === id) as ToDoItem).completed = result;
      dispatcher({
        type: "succeeded",
        itemList: [...state.itemList],
      });
    } catch {
      dispatcher({ type: "failed", itemList: state.itemList });
    }
  };

  const DeleteItem = async (id: number) => {
    dispatcher({ type: "deleting_item", itemList: state.itemList });
    try {
      await new ToDoClient("https://localhost:7025").delete(id);
      dispatcher({
        type: "succeeded",
        itemList: state.itemList.filter((c) => c.id !== id),
      });
    } catch {
      dispatcher({ type: "failed", itemList: state.itemList });
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
