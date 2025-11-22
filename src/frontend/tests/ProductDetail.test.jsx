import { render, screen } from "@testing-library/react";
import ProductDetail from "../components/ProductDetail.jsx";
import * as reactRoute from 'react-router-dom';

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useLocation: jest.fn(),
        useNavigate: jest.fn(),
    };
});

describe("Product Detail Component Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Show product detail info", () => {
        reactRoute.useNavigate.mockReturnValue(jest.fn());
        reactRoute.useLocation.mockReturnValue({
            state: {
                product: {
                    id: 1,
                    name: "Product 1",
                    price: 100,
                    quantity: 200,
                    description: "Product 1 description",
                    category: { id: 1, name: "category 1", description: "category 1 description" },
                }
            }
        })
        render(
            <ProductDetail />
        )
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText(100)).toBeInTheDocument();
        expect(screen.getByText(200)).toBeInTheDocument();
        expect(screen.getByText("Product 1 description")).toBeInTheDocument();
        expect(screen.getByText("category 1")).toBeInTheDocument();
        expect(screen.getByText("category 1 description")).toBeInTheDocument();

    })
})