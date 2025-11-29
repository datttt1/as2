import Login from "../components/Login";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import * as authService from "../services/AuthService";
import * as reactRouter from "react-router-dom";

jest.mock("../services/AuthService.js",()=>({
    __esModule: true,
    loginUser: jest.fn()
}));

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom")
    return {
        ...actual,
        useNavigate: jest.fn(),

    }
});


describe("Login Mock Test", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        reactRouter.useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    })
    test("Login successful", async () => {
        authService.loginUser.mockResolvedValue({
            success: true,
            message: "Login successful",
            token: 'mock-token-123'
        })
        render(<Login />)

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "usertest" } })
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "usertest123" } })

        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(authService.loginUser).toHaveBeenCalledTimes(1);
            expect(authService.loginUser).toHaveBeenCalledWith({ username: "usertest", password: "usertest123" });
            expect(mockNavigate).toHaveBeenCalledWith("/products", { state: { message: "Login successful" }, replace: true });
        })
    })


    test("Login failed with wrong password", async () => {
        window.alert = jest.fn();

        authService.loginUser.mockResolvedValue({
            success: false,
            token: null,
            message: "Wrong Password"
        })

        render(<Login />)

        fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } })
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "user123" } })

        fireEvent.click(screen.getByText("Login"));

        await waitFor(() => {
            expect(authService.loginUser).toHaveBeenCalledTimes(1);
            expect(authService.loginUser).toHaveBeenCalledWith({ username: "testuser", password: "user123" });
            expect(window.alert).toHaveBeenCalledWith("Wrong Password");
            expect(mockNavigate).not.toHaveBeenCalled();
        })

    })

})