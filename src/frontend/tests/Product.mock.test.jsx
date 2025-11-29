import { render, screen, fireEvent } from "@testing-library/jest-dom";
import * as reacRouter from 'react-router-dom';
import * as productService from '../services/ProductService';

const newProduct = {
    id: "",
    name: "Product 9",
    price: 99,
    quantity: 99,
    description: "Product 9 description",
    category: { id: 1, name: "category 1", description: "category 1 description" },
}

const updatedProduct = {
    id: 1,
    name: "Product 99",
    price: 99,
    quantity: 99,
    description: "Product 99 description",
    category: { id: 1, name: "category 1", description: "category 1 description" },
}
const productsMock = [
    { id: 1, name: "Product 1", price: 100, quantity: 200, description: "Product 1 description", category: { id: 1, name: "category 1", description: "category 1 description" } },
    { id: 2, name: "Product 2", price: 200, quantity: 300, description: "Product 2 description", category: { id: 2, name: "category 2", description: "category 2 description" } }
]


jest.mock("../services/ProductService.js",()=>({
    __esModule: true,
    create: jest.fn(),
    update: jest.fn(),
    deletee: jest.fn(),
    getAll: jest.fn()
}));


describe("Product Mock Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("Create product successful", async () => {
        productService.create.mockResolvedValue(newProduct);

        const res = await productService.create(newProduct);

        expect(productService.create).toHaveBeenCalledWith(newProduct);
        expect(productService.create).toHaveBeenCalledTimes(1);
        expect(res).toEqual(newProduct);
    })

    test("Update product successful", async () => {
        productService.update.mockResolvedValue(updatedProduct);
        const res = await productService.update(updatedProduct);

        expect(productService.update).toHaveBeenCalledWith(updatedProduct)
        expect(productService.update).toHaveBeenCalledTimes(1);
        expect(res).toEqual(updatedProduct);
    })

    test("Delete product successful", async () => {
        productService.deletee.mockResolvedValue({
            message: "Product deleted succesfully"
        })

        const res = await productService.deletee(1);

        expect(productService.deletee).toHaveBeenCalledTimes(1)
        expect(productService.deletee).toHaveBeenCalledWith(1)
        expect(res).toEqual({
            message: "Product deleted succesfully"
        })
    })

    test("Get all products successful", async () => {

        productService.getAll.mockResolvedValue(productsMock)

        const res = await productService.getAll()

        expect(productService.getAll).toHaveBeenCalledTimes(1)
        expect(res).toEqual(productsMock)
    })

    test("Create product failed", async () => {
        const mockError = new Error("Network Error");
        productService.create.mockRejectedValue(mockError);

        let resError
        try {
            await productService.create(newProduct)
        } catch (error) {
            resError = error
        }

        expect(productService.create).toHaveBeenCalledTimes(1)
        expect(productService.create).toHaveBeenCalledWith(newProduct)
        expect(resError).toEqual(mockError)
    })

    test("Update product failed", async () => {
        const mockError = new Error("Network Error");
        productService.update.mockRejectedValue(mockError);

        let resError
        try {
            await productService.update(updatedProduct)
        } catch (error) {
            resError = error
        }

        expect(productService.update).toHaveBeenCalledTimes(1)
        expect(productService.update).toHaveBeenCalledWith(updatedProduct)
        expect(resError).toEqual(mockError)
    })

    test("Delete product failed", async () => {
        const mockError = new Error("Network Error");
        productService.deletee.mockRejectedValue(mockError);

        let resError
        try {
            await productService.deletee(1)
        } catch (error) {
            resError = error
        }

        expect(productService.deletee).toHaveBeenCalledTimes(1)
        expect(productService.deletee).toHaveBeenCalledWith(1)
        expect(resError).toEqual(mockError)
    })

    test("Get all products failed", async () => {
        const mockError = new Error("Network Error");
        productService.getAll.mockRejectedValue(mockError);

        let resError
        try {
            await productService.getAll()
        } catch (error) {
            resError = error
        }

        expect(productService.getAll).toHaveBeenCalledTimes(1)
        expect(resError).toEqual(mockError)
    })
})
