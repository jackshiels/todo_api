/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ToDoItemModel } from "../models/itemModel";

interface Props {
  itemModel: ToDoItemModel;
}

const nameCss = css`
  text-align: left;
  padding: 20px;
  padding-top: 0px;
  float: right;
  font-size: 24px;
  width: calc(100% - 340px);
  background-color: steelblue;
  color: white;
  height: 110px;
`;

const descriptionCss = css`
  text-align: left;
  padding: 20px;
  padding-top: 0px;
  float: right;
  color: rgba(5, 83, 138, 1);
  width: calc(100% - 340px);
  background: rgb(249, 242, 219);
  background: linear-gradient(
    180deg,
    rgba(249, 242, 219, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 500px;
`;

export const SelectedItemWindow = (props: Props) => {
  return (
    <>
      <article css={nameCss}>
        <h2>{props.itemModel.name}</h2>
      </article>
      <article css={descriptionCss}>
        <>
          <h2>{props.itemModel.description}</h2>
          <p>
            {typeof props.itemModel.timestamp !== "undefined"
              ? `Created: ${props.itemModel.timestamp?.toDateString()}`
              : ""}
          </p>
        </>
      </article>
    </>
  );
};
