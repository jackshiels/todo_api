/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
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
    <AddItemDiv>
      <form onSubmit={(e) => submitForm(e)}>
        <label>Name</label>
        <SetValueInput
          type="text"
          value={name}
          name="name"
          required
          disabled={!loadCompleted}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <label>Description</label>
        <SetValueInput
          type="text"
          value={description}
          name="description"
          disabled={!loadCompleted}
          onChange={(e) => setDescription(e.target.value)}
        />
        <AddItemButton
          type="submit"
          value="Add Item"
          disabled={!loadCompleted}
        />
      </form>
    </AddItemDiv>
  );
};

const AddItemDiv = styled.div`
  width: 260px;
  height: 90px;
  text-align: left;
  padding: 20px;
  margin-bottom: 2px;
  color: white;
  background-color: rgba(39, 117, 163, 1);
  font-size: 14pt;
`;

const SetValueInput = styled.input`
  float: right;
  width: 150px;
`;

const AddItemButton = styled.input`
  margin-top: 10px;
  background-color: crimson;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  width: 100%;
  height: 30px;
  &:disabled {
    background-color: grey;
    border: 2px solid white;
  }
`;
