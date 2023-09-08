/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { FC } from "react";
import { useToDoContext } from "../providers/toDoProvider";

interface Props {
  title: String;
}

interface ThemeProps {
  loadCompleted: boolean;
}

const loadingIcon = require("../images/Skateboarding.gif");

export const Banner: FC<Props> = (props: Props) => {
  const { loadCompleted } = useToDoContext();

  const loadingJsx = (
    <img width={48} height={48} src={loadingIcon} alt="loadingIcon" />
  );
  const loadedJsx = <h3>Add your to do items below</h3>;

  return (
    <BannerDiv loadCompleted={loadCompleted}>
      <h1>{props.title}</h1>
      {loadCompleted ? loadedJsx : loadingJsx}
    </BannerDiv>
  );
};

const BannerDiv = styled.div<ThemeProps>`
  height: 160px;
  margin-top: 0px;
  padding-top: 5px;
  color: ${(props) => (props.loadCompleted ? "#05538a" : "#a80860")};
  background: white;
`;
