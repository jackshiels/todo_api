import React from "react";
import { FC } from "react";
import { useToDoContext } from "../providers/toDoProvider";

interface Props {
  title: String;
}

const loadingIcon = require("../images/Skateboarding.gif");

export const Banner: FC<Props> = (props: Props) => {
  const { loadCompleted } = useToDoContext();
  if (loadCompleted)
    return (
      <div className="Banner">
        <h1>{props.title}</h1>
        <h3>Add your to do items below</h3>
      </div>
    );
  else
    return (
      <div className="BannerLoading">
        <h1>{props.title}</h1>
        <img width={48} height={48} src={loadingIcon} alt="loadingIcon" />
      </div>
    );
};
