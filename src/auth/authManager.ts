import { Cookies } from "react-cookie";

export class AuthManager {
  private static instance: AuthManager;
  private cookies: Cookies;
  private tokenCookieName: string = "loginToken";

  private constructor() {
    this.cookies = new Cookies();
  }

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }

    return AuthManager.instance;
  }

  public CheckIfLoggedIn(): boolean {
    console.log("Checking");
    const loginTokenCookie = this.cookies.get(this.tokenCookieName);
    console.log(loginTokenCookie);
    return loginTokenCookie === undefined ? false : true;
  }

  public SetToken(token: string): void {
    this.cookies.set(this.tokenCookieName, token);
  }

  public GetToken(): string {
    return this.cookies.get(this.tokenCookieName);
  }
}
