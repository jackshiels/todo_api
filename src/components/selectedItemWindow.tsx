/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { useToDoContext } from "../providers/toDoProvider";

interface Props {
  itemId: number;
}

export const SelectedItemWindow = (props: Props) => {
  const { items } = useToDoContext();
  const item = items.find((c) => c.id === props.itemId);
  return (
    <>
      <Name>
        <h2>{item?.name}</h2>
      </Name>
      <Description>
        <>
          <h2>{item?.description}</h2>
          <p>
            {typeof item?.timeStamp !== "undefined"
              ? `Created: ${item.timeStamp?.toDateString()}`
              : ""}
          </p>
        </>
      </Description>
    </>
  );
};

const Name = styled.article`
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

const Description = styled.article`
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
