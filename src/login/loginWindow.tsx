/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { useUserContext } from "../providers/userProvider";
import { FormEvent, useState } from "react";

export const LoginWindow = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const { attemptLogin } = useUserContext();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    console.log(attemptLogin);
    const result = await attemptLogin(username, password);
    console.log(result);
    if (!result) setError(true);
    else setError(false);

    // Navigate...
    // TODO
  };

  const loginEnabled = username.length !== 0 && password.length !== 0;

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
            data-testid="username"
          />
          <TextInput
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            data-testid="password"
          />
          {error ? (
            <ErrorText data-testid="error">incorrect user details</ErrorText>
          ) : (
            <></>
          )}
          <br></br>
          {loginEnabled ? (
            <SubmitInput type="submit" value="Log In" data-testid="submit" />
          ) : (
            <SubmitInput
              disabled
              type="submit"
              value="Log In"
              data-testid="submit"
            />
          )}
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

const ErrorText = styled.p`
  color: white;
  font-size: 14pt;
`;
