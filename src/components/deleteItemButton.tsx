/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const deleteIcon = css`
  padding: 7px;
`;

const deleteItem = css`
  width: 40px;
  float: left;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
  height: 75px;
  margin-top: 2px;
  margin-bottom: 2px;
  color: white;
  background-color: darkgray;
  border: 2px white;
  align-items: center;
  display: inline-flex;
  &:hover {
    background-color: rgb(97, 97, 97);
  }
`;

const deleteIconImage = require("../images/icons8-delete-24.png");

interface props {
  id: number;
  deleteItem: (id: number) => {};
}

export const DeleteItemButton = (props: props) => {
  return (
    <div
      onClick={async () => {
        await props.deleteItem(props.id);
      }}
      css={deleteItem}
    >
      <img
        css={deleteIcon}
        width={24}
        height={24}
        src={deleteIconImage}
        alt="deleteIcon"
      />
    </div>
  );
};
