import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";

export const AboutPage = () => {
  return (
    <>
      <h2>This is my amazing todo app!</h2>
      <p>Please leave nice reviews about it on my webzone!</p>
      <Link to={`/items/1`}>
        <BeginButton type="button" value={"Start writing!"} />
      </Link>
    </>
  );
};

const BeginButton = styled.input`
  margin-top: 10px;
  background-color: crimson;
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  width: 200px;
  height: 30px;
  &:disabled {
    background-color: grey;
    border: 2px solid white;
  }
`;
