/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";

export const LoginWindow = () => {
  return (
    <>
      <LoginWindowDiv>
        <h3>Log In</h3>
        <h4>Enter your username and password to continue</h4>
        <TextInput type="text" placeholder="username" />
        <TextInput type="text" placeholder="password" />
        <br></br>
        <SubmitInput type="button" value="Log In" />
      </LoginWindowDiv>
    </>
  );
};

const LoginWindowDiv = styled.div`
  text-align: center;
  margin-left: calc(50% - 160px);
  margin-top: 100px;
  width: 300px;
  height: 300px;
  background: dodgerblue;
  border: black 2px dashed;
  border-radius: 15px;
  color: white;
  padding: 20px;
`;

const TextInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 10px;
  font-size: 14pt;
  margin: 10px;
`;

const SubmitInput = styled.input`
  width: 210px;
  height: 30px;
  border-radius: 10px;
  font-size: 14pt;
  margin: 10px;
`;
