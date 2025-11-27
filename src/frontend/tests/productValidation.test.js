import { validateProduct } from "../utils/productValidation.js";

export const product = {
    name: 'Sản phẩm 1',
    price: '10000',
    quantity: '10',
    description: 'Mô tả sản phẩm',
    category: {
        id: 1,
        name: 'Danh mục 1'
    },
    categories: [
        {
            id: 1,
            name: 'Danh mục 1'
        },
        {
            id: 2,
            name: 'Danh mục 2'
        },
        {
            id: 3,
            name: 'Danh mục 3'
        }
    ]
}

describe('Product Validation Tests', () => {

    // Product Name
    test('TC1: Tên sản phẩm rỗng', () => {
        const p = { ...product, name: '' };
        const errors = validateProduct(p);
        expect(errors.name).toBe(
            'Tên sản phẩm không được để trống'
        );
    });

    test('TC2: Tên sản phẩm quá ngắn', () => {
        const p = { ...product, name: 'ab' };
        const errors = validateProduct(p);
        expect(errors.name).toBe(
            'Tên sản phẩm phải có ít nhất 3 ký tự'
        )
    });

    test('TC3: Tên sản phẩm quá dài', () => {
        const p = { ...product, name: 'a'.repeat(101) };
        const errors = validateProduct(p);
        expect(errors.name).toBe(
            'Tên sản phẩm không được quá 100 ký tự'
        );
    });

    // Price 
    test('TC4: Giá sản phẩm không phải là số', () => {
        const p = { ...product, price: 'abc' };
        const errors = validateProduct(p);
        expect(errors.price).toBe(
            'Giá sản phẩm phải là số'
        );
    });

    test('TC5: Giá sản phẩm âm', () => {
        const p = { ...product, price: -1000 }
        const errors = validateProduct(p);
        expect(errors.price).toBe(
            'Giá sản phẩm phải lớn hơn 0'
        );
    });

    test('TC6: Giá sản phẩm quá lớn', () => {
        const p = { ...product, price: 1000000000 };
        const errors = validateProduct(p);
        expect(errors.price).toBe(
            'Giá sản phẩm phải nhỏ hơn 1 tỷ'
        );
    });
    test("TC6.1: Giá sản phẩm là số thập phân", () => {
        const p = { ...product, price: 1.99 };
        const errors = validateProduct(p);
        expect(errors.price).toBeUndefined();
    });
    // Quantity 
    test('TC7: Số lượng sản phẩm không phải là số', () => {
        const p = { ...product, quantity: 'abc' };
        const errors = validateProduct(p);
        expect(errors.quantity).toBe(
            'Số lượng sản phẩm phải là số nguyên dương'
        );
    });

    test('TC8: Số lượng sản phẩm âm', () => {
        const p = { ...product, quantity: -1000 };
        const errors = validateProduct(p);
        expect(errors.quantity).toBe(
            'Số lượng sản phẩm phải lớn hơn hoặc bằng 0'
        );
    });

    test('TC9: Số lượng sản phẩm quá lớn', () => {
        const p = { ...product, quantity: 100001 };
        const errors = validateProduct(p);
        expect(errors.quantity).toBe(
            'Số lượng sản phầm phải nhỏ hơn 100,000'
        );
    });

    // Description
    test('TC10: Mô tả sản phẩm quá dài', () => {
        const p = { ...product, description: 'a'.repeat(501) };
        const errors = validateProduct(p);
        expect(errors.description).toBe(
            'Mô tả sản phẩm không được quá 500 ký tự'
        );
    });

    // Category 
    test('TC11: Danh mục sản phẩm rỗng', () => {
        const p = { ...product, category: null };
        const errors = validateProduct(p);
        expect(errors.category).toBe(
            'Danh mục sản phẩm không được để trống'
        );
    });

    test('TC12: Danh mục sản phẩm không có sẵn', () => {
        const p = { ...product, category: { id: 4, name: 'Danh mục 4' } };
        const errors = validateProduct(p);
        expect(errors.category).toBe(
            'Danh mục sản phẩm không có sẵn'
        );
    });

    test('TC13: Sản phẩm hợp lệ',()=>{
        const errors = validateProduct(product);
        expect(Object.keys(errors).length).toBe(0);
    })






})