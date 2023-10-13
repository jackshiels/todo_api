/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { useUserContext } from "../providers/userProvider";
import { FormEvent, useState } from "react";
import { AuthManager } from "../auth/authManager";

export const LoginWindow = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { attemptLogin } = useUserContext();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    const result = await attemptLogin(username, password);
    console.log(
      result ? AuthManager.getInstance().GetToken() : "Login failed."
    );
  };

  return (
    <>
      <LoginWindowDiv>
        <form onSubmit={(e) => submitForm(e)}>
          <h3>Log In</h3>
          <h4>Enter your username and password to continue</h4>
          <TextInput
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <br></br>
          <SubmitInput type="submit" value="Log In" />
        </form>
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
