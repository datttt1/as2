import ProductList from "../components/ProductList.jsx";
import * as reactRoute from 'react-router-dom';
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { getAll as getAllProducts } from "../services/ProductService.js";
import { getAll as getAllCategories } from "../services/CategoryService.js";

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useLocation: jest.fn(),
    }
})
jest.mock("../services/ProductService.js");
jest.mock("../services/CategoryService.js");
const productsMock = [
    { id: 1, name: "Product 1", price: 100, quantity: 200, description: "Product 1 description", category: { id: 1, name: "category 1", description: "category 1 description" } },
    { id: 2, name: "Product 2", price: 200, quantity: 300, description: "Product 2 description", category: { id: 2, name: "category 2", description: "category 2 description" } },
    { id: 3, name: "Product 3", price: 300, quantity: 400, description: "Product 3 description", category: { id: 1, name: "category 1", description: "category 1 description" } },
]
const newProductMock = {
    id: 4, name: "Product 4", price: 400, quantity: 500, description: "Product 4 description", category: { id: 1, name: "category 1", description: "category 1 description" }
}
const categoriesMock = [
    { id: 1, name: "category 1", description: "category 1 description" },
    { id: 2, name: "category 2", description: "category 2 description" }
]
getAllProducts.mockResolvedValue(productsMock);
getAllCategories.mockResolvedValue(categoriesMock);

describe("ProductList Component Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test("Render Component", async () => {

        reactRoute.useLocation.mockReturnValue({ state: { newProduct: null, updatedProduct: null } })
        render(
            <reactRoute.MemoryRouter>
                <ProductList />
            </reactRoute.MemoryRouter>
        )
        await waitFor(() => {
            expect(getAllCategories).toHaveBeenCalledTimes(1);
            expect(getAllProducts).toHaveBeenCalledTimes(1);
        })

        expect(screen.getByText("Products")).toBeInTheDocument();
        const table = screen.getByTestId("product-table");
        expect(table).toBeInTheDocument();

        expect(screen.getByText("ID")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Price")).toBeInTheDocument();
        expect(screen.getByText("Quantity")).toBeInTheDocument();
        expect(screen.getByText("Category")).toBeInTheDocument();

        expect(screen.getByText("+ New product")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getAllByRole("row").length).toBe(4);
        })


        const row1 = await screen.findByTestId("row-1");
        const editButton = within(row1).getByLabelText("edit");
        expect(editButton).toBeInTheDocument();
        const editIcon = editButton.querySelector("svg");

        const deleteButton = within(row1).getByLabelText("delete");
        expect(deleteButton).toBeInTheDocument();
        const deleteIcon = deleteButton.querySelector("svg");

        fireEvent.mouseEnter(row1);

        await waitFor(() => {
            expect(row1.style.backgroundColor).toBe("lightgray");
            expect(editIcon.style.color).toBe("black");
            expect(deleteIcon.style.color).toBe("red");

        })

        fireEvent.mouseLeave(row1);

        await waitFor(() => {
            expect(row1.style.backgroundColor).toBe("transparent");
            expect(editIcon.style.color).toBe("transparent");
            expect(deleteIcon.style.color).toBe("transparent");
        });

    })

})