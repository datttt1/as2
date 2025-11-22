import { render, waitFor, screen, fireEvent, within, userEvent } from "@testing-library/react";
import * as reactRouter from 'react-router-dom';
import ProductList from "../components/ProductList.jsx";
import { getAll as getAllProducts } from "../services/ProductService.js";
import { getAll as getAllCategories } from "../services/CategoryService.js";
import { deletee as deleteProduct } from "../services/ProductService.js";

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useNavigate: jest.fn(),
    }
})
const productsMock = [
    { id: 1, name: "Product 1", price: 100, quantity: 200, description: "Product 1 description", category: { id: 1, name: "category 1", description: "category 1 description" } },
    { id: 2, name: "Product 2", price: 200, quantity: 300, description: "Product 2 description", category: { id: 2, name: "category 2", description: "category 2 description" } }
]
const categoriesMock = [
    { id: 1, name: "category 1", description: "category 1 description" },
    { id: 2, name: "category 2", description: "category 2 description" }
]

jest.mock("../services/ProductService.js");
jest.mock("../services/CategoryService.js");
getAllCategories.mockResolvedValue(categoriesMock);
getAllProducts.mockResolvedValue(productsMock);
deleteProduct.mockResolvedValue({
    status: 200,
    data: {
        message: "Product deleted successfully"
    }
});

describe("Product List Component Integration Test", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        reactRouter.useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    })

    test("Navigate to Product Form to edit product", async () => {
        render(
            <reactRouter.MemoryRouter>
                <ProductList />
            </reactRouter.MemoryRouter>
        )
        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalledTimes(1);
            expect(getAllProducts).toHaveBeenCalledTimes(1);
        })

        waitFor(() => {
            expect(screen.getByText("Product 1")).toBeInTheDocument();
            expect(screen.getByText("Product 2")).toBeInTheDocument();
            expect(screen.getAllByRole("row").length).toBe(3);
        })

        const row1 = await screen.findByTestId("row-1");
        const editButton = within(row1).getByLabelText("edit");
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(
                "/products/form",
                {
                    state: {
                        product: { ...productsMock[0], categories: categoriesMock }
                    }
                }
            )

        })
    })

    test("Navigate to Product Form to add new product", async () => {
        render(
            <reactRouter.MemoryRouter>
                <ProductList />
            </reactRouter.MemoryRouter>
        )

        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalledTimes(1);
            expect(getAllProducts).toHaveBeenCalledTimes(1);
            expect(screen.getAllByRole("row").length).toBe(3);
        })

        const createButton = screen.getByText("+ New product");
        expect(createButton).toBeInTheDocument();

        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith("/products/form",
                {
                    state: {
                        product: {
                            categories: categoriesMock
                        }
                    }
                }
            );
        })
    })

    test("Navigate to Product Detail", async () => {
        render(
            <reactRouter.MemoryRouter>
                <ProductList />
            </reactRouter.MemoryRouter>
        )
        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalledTimes(1);
            expect(getAllProducts).toHaveBeenCalledTimes(1);
        })

        waitFor(() => {
            expect(screen.getAllByRole("row").length).toBe(3);
        })
        const row1 = await screen.findByTestId("row-1");
        expect(row1).toBeInTheDocument();

        const cell = await within(row1).findByText("Product 1");
        expect(cell).toBeInTheDocument();

        fireEvent.click(cell);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith(
                "/products/detail",
                {
                    state: {
                        product: productsMock[0]
                    }
                }
            )
        })
    })

    test("Delete product", async () => {
        render(
            <reactRouter.MemoryRouter>
                <ProductList />
            </reactRouter.MemoryRouter>
        )

        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalledTimes(1);
            expect(getAllProducts).toHaveBeenCalledTimes(1);
        })

        await waitFor(() => {
            expect(screen.getAllByRole("row").length).toBe(3);
        })

        const row1 = await screen.findByTestId("row-1");
        expect(row1).toBeInTheDocument();

        const deleteButton = within(row1).getByLabelText("delete");
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        await waitFor(()=>{
            expect(screen.getByRole("alert")).toHaveTextContent("Deleted product successfully");
        })
    })
})