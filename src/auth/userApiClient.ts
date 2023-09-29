import { AuthManager } from "./authManager";

const url: string = "https://localhost:7025/api/User/Login";

interface UserLogin {
  UserName: string;
  Password: string;
}

const UserApiClient = (userLogin: UserLogin) => {
  const postLogin = async (userLogin: UserLogin) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const token = await response.json();
      AuthManager.getInstance().SetToken(token);
      return true;
    } else {
      return false;
    }
  };

  return postLogin(userLogin);
};

export default UserApiClient;
