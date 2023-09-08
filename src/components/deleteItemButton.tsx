/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";

const deleteIconImage = require("../images/icons8-delete-24.png");

interface props {
  id: number;
  deleteItem: (id: number) => {};
}

export const DeleteItemButton = (props: props) => {
  return (
    <DeleteDiv
      onClick={async () => {
        await props.deleteItem(props.id);
      }}
    >
      <DeleteIcon
        width={24}
        height={24}
        src={deleteIconImage}
        alt="deleteIcon"
      />
    </DeleteDiv>
  );
};

const DeleteIcon = styled.img`
  padding: 7px;
`;

const DeleteDiv = styled.div`
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
  border: solid 2px grey;
  align-items: center;
  display: inline-flex;
  &:hover {
    background-color: rgb(97, 97, 97);
  }
`;
