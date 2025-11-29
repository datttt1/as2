import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import React from "react";
import axios from "axios";
import { MemoryRouter, useNavigate } from "react-router-dom";
import * as reactRouter from "react-router-dom";
import ProductForm from "../components/ProductForm.jsx";
import { getAll } from "../services/CategoryService.js";


jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useLocation: jest.fn(),
        useNavigate: jest.fn(),
    };
});
const categoriesMock = [
    { id: 1, name: "category 1", description: "category 1 description" },
    { id: 2, name: "category 2", description: "category 2 description" },
];
const notNullProduct = {
    id: 1,
    name: "Product 1",
    price: 100,
    quantity: 200,
    description: "Product 1 description",
    category: { id: 1, name: "category 1", description: "category 1 description" },
    categories: categoriesMock

};

jest.mock("../services/CategoryService.js",()=>({
    __esModule: true,
    getAll: jest.fn().mockResolvedValue(categoriesMock)
}));
jest.mock("../services/ProductService.js", () => ({
  __esModule: true,
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}));

describe("Product Form Component Test", () => {
    beforeEach(() => {
        reactRouter.useNavigate.mockReturnValue(jest.fn());
    })

    test("Show product info when update", async () => {
        reactRouter.useLocation.mockReturnValue({ state: { product: notNullProduct } });

        render(
            <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );
        expect(screen.getByDisplayValue("Product 1")).toBeInTheDocument();
        expect(screen.getByDisplayValue(100)).toBeInTheDocument();
        expect(screen.getByDisplayValue(200)).toBeInTheDocument();
        expect(screen.getByDisplayValue("Product 1 description")).toBeInTheDocument();
        expect(screen.getByDisplayValue("category 1")).toBeInTheDocument();
        expect(screen.getByText("Update")).toBeInTheDocument();
    })

    test("Show empty product info when create", () => {
        reactRouter.useLocation.mockReturnValue({ state: { product: { categories: categoriesMock } } });
        render(
            <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );

        expect(screen.getAllByDisplayValue("")).toHaveLength(5);
        expect(screen.getByText("Create")).toBeInTheDocument();

    })

    test("Show categories dropdownlist", () => {
        render(
            <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );
        const combobox = screen.getByRole("combobox");
        fireEvent.focus(combobox);

        expect(screen.getByText("category 1")).toBeInTheDocument();
        expect(screen.getByText("category 2")).toBeInTheDocument();
    })


    test("Change category after selected", () => {
        render(
            <MemoryRouter>
                <ProductForm />
            </MemoryRouter>
        );
        const combobox = screen.getByRole("combobox");
        fireEvent.focus(combobox);
        const option = screen.getByText("category 2");
        fireEvent.click(option);
        expect(screen.getByDisplayValue("category 2")).toBeInTheDocument();

    })
})
