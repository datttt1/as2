import * as reactRouter from "react-router-dom";
import Login from "../components/Login.jsx";
import { render, screen,fireEvent } from "@testing-library/react";

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom")
    return {
        ...actual,
        useNavigate: jest.fn(),

    }
})
jest.mock("../services/AuthService.js", () => ({
    __esModule: true,
    loginUser: jest.fn()
}));
describe("Login Component Test", () => {
    const navigateMock = jest.fn();
    beforeEach(() => {
        reactRouter.useNavigate.mockReturnValue(navigateMock);
        jest.clearAllMocks();

    })
    test("Login rendering", () => {
        render(
            <Login />
        )
        expect(screen.getByText("Flogin")).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();

        const usernameInput = screen.getByPlaceholderText("Username")
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText("Password")
        expect(passwordInput).toBeInTheDocument();
    })

    test("Change username input and password input", () => {
        render(<Login />)

        const usernameInput = screen.getByPlaceholderText("Username")
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByPlaceholderText("Password")
        expect(passwordInput).toBeInTheDocument();

        fireEvent.change(usernameInput, { target: { value: "test" } })
        fireEvent.change(passwordInput, { target: { value: "test123" } })

        expect(screen.getByDisplayValue("test")).toBeInTheDocument();
        expect(screen.getByDisplayValue("test123")).toBeInTheDocument();

    })
})