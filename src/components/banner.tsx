import React from "react";
import { FC } from "react";
import { useToDoContext } from "../providers/toDoProvider";

interface Props {
  title: String;
}

export const Banner: FC<Props> = (props: Props) => {
  const { loadCompleted } = useToDoContext();
  if (loadCompleted)
    return (
      <div className="Banner">
        <h2>{props.title}</h2>
        <h3>Add your to do items below</h3>
      </div>
    );
  else
    return (
      <div className="Banner">
        <h2>Loading...</h2>
      </div>
    );
};
