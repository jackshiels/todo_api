/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { useToDoContext } from "../providers/toDoProvider";

interface Props {
  title: String;
}

const loadingIcon = require("../images/Skateboarding.gif");

export const Banner: FC<Props> = (props: Props) => {
  const { loadCompleted } = useToDoContext();

  const bannerCss = css`
    height: 160px;
    margin-top: 0px;
    padding-top: 5px;
    color: ${loadCompleted ? "#05538a" : "#a80860"};
    background: white;
  `;

  if (loadCompleted)
    return (
      <div css={bannerCss}>
        <h1>{props.title}</h1>
        <h3>Add your to do items below</h3>
      </div>
    );
  else
    return (
      <div css={bannerCss}>
        <h1>{props.title}</h1>
        <img width={48} height={48} src={loadingIcon} alt="loadingIcon" />
      </div>
    );
};
