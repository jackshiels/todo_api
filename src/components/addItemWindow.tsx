import React from "react";
import { FormEvent, useState } from "react";
import { useToDoContext } from "../providers/toDoProvider";
import { ToDoItem } from "../controllers/todoController";

interface Props {
  enabled: Boolean;
}

export const AddItemWindow = (props: Props) => {
  const { AddItem, loadCompleted } = useToDoContext();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    AddItem({ name: name, description: description } as ToDoItem);
  };

  return (
    <div className="AddToDoItemWindow">
      <form onSubmit={(e) => submitForm(e)}>
        <label>Name</label>
        <input
          className="SetValueInput"
          type="text"
          value={name}
          name="name"
          required
          disabled={!loadCompleted}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label>Description</label>
        <input
          className="SetValueInput"
          type="text"
          value={description}
          name="description"
          disabled={!loadCompleted}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="AddItemButton"
          type="submit"
          value="Add Item"
          disabled={!loadCompleted}
        />
      </form>
    </div>
  );
};
