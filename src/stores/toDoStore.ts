import { ItemModel } from "../models/itemModel";

export const toDoStore: ItemModel[] = [
  {
    id: 0,
    name: "",
    description: "",
    completed: false,
    timestamp: new Date(),
  },
];

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
  itemList: ItemModel[];
}

interface InitialLoading {
  type: "initial_loading";
}

interface InitialLoadSucceeded {
  type: "initial_load_Succeeded";
  itemList: ItemModel[];
}

interface InitialLoadFailed {
  type: "initial_load_failed";
}

interface AddingItem {
  type: "adding_item";
  itemList: ItemModel[];
}

interface DeletingItem {
  type: "deleting_item";
  itemList: ItemModel[];
}

interface Succeeded {
  type: "succeeded";
  itemList: ItemModel[];
}

interface Failed {
  type: "failed";
  itemList: ItemModel[];
}

export type Action =
  | InitialLoading
  | InitialLoadSucceeded
  | InitialLoadFailed
  | AddingItem
  | DeletingItem
  | Succeeded
  | Failed;
