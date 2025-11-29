import ProductForm from "../components/ProductForm";
import * as reactRoute from 'react-router-dom';
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { create, update, getAll as getAllProducts } from "../services/ProductService.js";
import ProductList from "../components/ProductList.jsx";
import { getAll as getAllCategories } from "../services/CategoryService.js";

const categoriesMock = [
    { id: 1, name: "category 1", description: "category 1 description" },
    { id: 2, name: "category 2", description: "category 2 description" },
];
jest.mock("../services/CategoryService.js",()=>({
      __esModule: true,
    getAll: jest.fn().mockResolvedValue(categoriesMock)
}));

const createdProduct = {
    id: "",
    name: "Product 99",
    price: "100",
    quantity: "100",
    description: "Product 99 description",
    category: { id: 1, name: "category 1", description: "category 1 description" },
}
const updatedProduct = {
    id: 1,
    name: "Product 99",
    price: "99",
    quantity: "99",
    description: "Product 99 description",
    category: { id: 1, name: "category 1", description: "category 1 description" },
}
jest.mock("../services/ProductService.js",()=>({
      __esModule: true,   
    getAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(createdProduct),
    update: jest.fn().mockResolvedValue(updatedProduct)
}));

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useLocation: jest.fn(),
        useNavigate: jest.fn(),
    };
});

describe("Product Form Integration Test", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        reactRoute.useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    })

    test("Add new Product Successful", async () => {
        reactRoute.useLocation.mockReturnValue({ state: { product: { categories: categoriesMock } } })
        render(
            <reactRoute.MemoryRouter>
                <ProductForm />
            </reactRoute.MemoryRouter>
        );
        fireEvent.change(await screen.findByLabelText(/product name/i), { target: { value: "Product 99" } });
        fireEvent.change(await screen.findByLabelText(/price/i), { target: { value: 100 } });
        fireEvent.change(await screen.findByLabelText(/quantity/i), { target: { value: 100 } });
        fireEvent.change(await screen.findByLabelText(/description/i), { target: { value: "Product 99 description" } });

        const combobox = screen.getByRole("combobox");
        fireEvent.focus(combobox);

        const option = screen.getByText("category 1");
        fireEvent.click(option);

        fireEvent.click(screen.getByText("Create"));

        reactRoute.useLocation.mockReturnValue({ state: { message: "Created product successfully" } });

        await waitFor(() => {
            expect(create).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledTimes(1)
        })

        render(
            <reactRoute.MemoryRouter>
                <ProductList />
            </reactRoute.MemoryRouter>
        )
        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalled();
            expect(getAllProducts).toHaveBeenCalled();
            expect(screen.getByRole("alert")).toHaveTextContent("Created product successfully");

        })



    });

    test("Update Product Successful", async () => {
        reactRoute.useLocation.mockReturnValue({
            state: {
                product: {
                    id: 1,
                    name: "Product 1",
                    price: 100,
                    quantity: 200,
                    description: "Product 1 description",
                    category: { id: 2, name: "category 2", description: "category 2 description" },
                    categories: categoriesMock
                }
            }
        });
        render(
            <reactRoute.MemoryRouter>
                <ProductForm />
            </reactRoute.MemoryRouter>
        );
        fireEvent.change(screen.getByDisplayValue("Product 1"), { target: { value: "Product 99" } });
        fireEvent.change(screen.getByDisplayValue(100), { target: { value: 99 } });
        fireEvent.change(screen.getByDisplayValue(200), { target: { value: 99 } });
        fireEvent.change(screen.getByDisplayValue("Product 1 description"), { target: { value: "Product 99 description" } });

        const combobox = screen.getByRole("combobox");
        fireEvent.focus(combobox);

        const option = screen.getByText("category 2");
        fireEvent.click(option);

        fireEvent.click(screen.getByText("Update"));

        reactRoute.useLocation.mockReturnValue({ state: { message: "Updated product successfully" } })
        render(
            <reactRoute.MemoryRouter>
                <ProductList />
            </reactRoute.MemoryRouter>
        )
        await waitFor(() => {
            expect(update).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledTimes(1)
            expect(screen.getByRole("alert")).toHaveTextContent("Updated product successfully");
        })


    })

})

