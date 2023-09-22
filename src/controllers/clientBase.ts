import { AuthManager } from "../auth/authManager";

export class ClientBase {
  private token: string = "";
  public ClientBase() {
    this.token = AuthManager.getInstance().GetToken();
  }

  protected transformOptions(options: RequestInit) {
    options.headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.token,
    };
    return Promise.resolve(options);
  }
}
