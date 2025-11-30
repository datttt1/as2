import Login from "../components/Login.jsx";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import * as reactRouter from "react-router-dom";
import { use } from "react";
import * as loginService from "../services/AuthService.js";


jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useNavigate: jest.fn(),
        useLocation: jest.fn(),
    }
})
jest.mock("../services/AuthService.js", () => ({
    __esModule: true,
    loginUser: jest.fn().mockResolvedValue({
        success: true,
        message: "Login successful",
        token: "mock-token-123"
    })
}));
jest.mock("../services/CategoryService.js", () => ({
    __esModule: true,
    getAll: jest.fn()
}));

jest.mock("../services/ProductService.js", () => ({
    __esModule: true,
    getAll: jest.fn(),
}));

describe("Login Integration Test", () => {
    const navigateMock = jest.fn();
    beforeEach(() => {
        window.alert = jest.fn();
        reactRouter.useNavigate.mockReturnValue(navigateMock);
        jest.clearAllMocks();
    })

    test("Show errors when submit empty username and password", async () => {
        render(<Login />)

        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();

        fireEvent.click(loginButton);

        await waitFor(() => {
            const usernameError = screen.getByTestId("username-error");
            const passwordError = screen.getByTestId("password-error");

            expect(usernameError.textContent.length).toBeGreaterThan(0);
            expect(passwordError.textContent.length).toBeGreaterThan(0);
        })

    })

    test("Login successful", async () => {

        render(<Login />)

        const usernameInput = screen.getByPlaceholderText("Username");
        const passwordInput = screen.getByPlaceholderText("Password");
        const loginButton = screen.getByText("Login");

        fireEvent.change(usernameInput, { target: { value: "user1" } });
        fireEvent.change(passwordInput, { target: { value: "user123" } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            const usernameError = screen.queryByTestId("username-error");
            const passwordError = screen.queryByTestId("password-error");
            expect(usernameError.textContent.length).toBe(0);
            expect(passwordError.textContent.length).toBe(0);
        })

        await waitFor(() => {
            expect(loginService.loginUser).toHaveBeenCalledTimes(1);
            expect(navigateMock).toHaveBeenCalledTimes(1);
            expect(navigateMock).toHaveBeenCalledWith("/products", { state: { message: "Login successful" }, replace: true });


        })
    })
})