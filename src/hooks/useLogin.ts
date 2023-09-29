import { useEffect, useState } from "react";
import { AuthManager } from "../auth/authManager";

const url: string = "https://localhost:7025/api/user/login";

interface UserLogin {
  UserName: string;
  Password: string;
}

const useLogin = (userLogin: UserLogin) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  const postLogin = async (userLogin: UserLogin) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userLogin),
    });

    if (response.ok) {
      setLoginStatus(true);
      const token = await response.json();
      AuthManager.getInstance().SetToken(token);
    } else {
      setLoginStatus(false);
    }
  };

  useEffect(() => {
    postLogin(userLogin);
  });

  return { loginStatus };
};

export default useLogin;
