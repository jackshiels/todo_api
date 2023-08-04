import { createContext, useContext, useEffect, useReducer } from "react";
import { ItemModel } from "../models/itemModel";
import { State, reducer, toDoStore } from "../stores/toDoStore";
import { HttpResult, OkGetResult } from "../stores/resultStore";
import { usePostRequest } from "../hooks/usePostRequest";
import { useDeleteRequest } from "../hooks/useDeleteRequest";
import { useGetRequest } from "../hooks/useGetRequest";

type ToDoItemsState = {
  items: ItemModel[];
  AddItem: (item: ItemModel) => void;
  DeleteItem: (id: number) => void;
};

const initialState: ToDoItemsState = {
  items: toDoStore,
  AddItem: () => {},
  DeleteItem: () => {},
};

const initialLoadingState: State = {
  initialLoading: true,
  initialLoadSucceeded: false,
  initialLoadFailed: false,
  addingItem: false,
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
      const result: HttpResult = await useGetRequest({ apiUrl: "" });
      if (result.statusCode === 200) {
        dispatcher({
          type: "initial_load_Succeeded",
          itemList: (result as OkGetResult).items,
        });
      } else {
        dispatcher({ type: "initial_load_failed" });
      }
    };
    GetInitialItems();
  });

  const AddItem = async (item: ItemModel) => {
    dispatcher({ type: "adding_item", itemList: state.itemList });
    const result: HttpResult = await usePostRequest({ apiUrl: "", item });
    if (result.statusCode === 200) {
      dispatcher({
        type: "succeeded",
        itemList: [...state.itemList, item],
      });
    } else {
      dispatcher({ type: "failed", itemList: state.itemList });
    }
  };

  const DeleteItem = async (itemId: number) => {
    dispatcher({ type: "deleting_item", itemList: state.itemList });
    const result: HttpResult = await useDeleteRequest({
      apiUrl: "",
      itemId: itemId,
    });
    if (result.statusCode === 200) {
      dispatcher({
        type: "succeeded",
        itemList: state.itemList.filter((c) => c.id !== itemId),
      });
    } else {
      dispatcher({ type: "failed", itemList: state.itemList });
    }
  };

  const toDoState: ToDoItemsState = {
    items: state.itemList,
    AddItem: AddItem,
    DeleteItem: DeleteItem,
  };

  return (
    <ToDoContext.Provider value={toDoState}>{children}</ToDoContext.Provider>
  );
};
