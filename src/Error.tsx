/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useRouteError } from "react-router-dom";

const errorCss = css`
  margin: 50px;
`;

export const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div css={errorCss}>
      <h2>Error</h2>
      <p>Did you enter the wrong address?</p>
    </div>
  );
};
