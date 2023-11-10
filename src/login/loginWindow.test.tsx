import { act, fireEvent, render, screen } from "@testing-library/react";
import { LoginWindow } from "./loginWindow";

let mockAttemptLogin = jest.fn(() => Promise.resolve(true));

jest.mock("../providers/userProvider", () => ({
  useUserContext: () => {
    return {
      loggedIn: true,
      username: "",
      attemptLogin: mockAttemptLogin,
      attemptLogout: () => {},
    };
  },
}));

describe("Login window", () => {
  beforeEach(() => {});

  it("renders two text boxes and a login button", () => {
    render(<LoginWindow />);
    const submitButton = screen.getByRole("button");
    const username = screen.getByRole("textbox");
    // Password has no role
    const password = screen.getByTestId("password");

    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("renders the placeholder text value", () => {
    render(<LoginWindow />);
    const usernamePlaceholder = screen.getByPlaceholderText(/username/i);

    expect(usernamePlaceholder).toBeInTheDocument();
  });

  it("disables the login button by default", () => {
    render(<LoginWindow />);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("enables the login button when inputs are filled", () => {
    render(<LoginWindow />);
    const button = screen.getByRole("button");
    const username = screen.getByRole("textbox");
    // Password has no role
    const password = screen.getByTestId("password");

    fireEvent.input(username, { target: { value: "myUsername" } });
    fireEvent.input(password, { target: { value: "myPassword" } });

    expect(button).toBeEnabled();
  });

  it("calls the login function on button press", () => {
    render(<LoginWindow />);
    const button = screen.getByTestId("submit");
    const username = screen.getByRole("textbox");
    // Password has no role
    const password = screen.getByTestId("password");

    fireEvent.input(username, { target: { value: "myUsername" } });
    fireEvent.input(password, { target: { value: "myPassword" } });

    fireEvent.click(button);

    expect(mockAttemptLogin).toHaveBeenCalled();
  });

  it("renders an error message when login is rejected", async () => {
    render(<LoginWindow />);
    mockAttemptLogin = jest.fn(() => Promise.resolve(false));
    const button = screen.getByTestId("submit");
    const username = screen.getByRole("textbox");
    // Password has no role
    const password = screen.getByTestId("password");

    fireEvent.input(username, { target: { value: "myUsername" } });
    fireEvent.input(password, { target: { value: "myPassword" } });

    await act(() => {
      button.click();
    });

    const errorMessage = screen.getByTestId("error");

    expect(mockAttemptLogin).toHaveBeenCalled();
    expect(errorMessage.innerHTML).toBe("incorrect user details");
  });
});
