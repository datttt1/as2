import { validateUsername,validatePassword } from "../utils/loginValidation.js";

describe('Login Validation Tests',()=>{
    test('TC1: Username rỗng',()=>{
        expect(validateUsername('')).toBe(
            'Username không được để trống'
        );
    });
    test('TC2: Username quá ngắn', ()=>{
        expect(validateUsername('ab')).toBe(
            'Username phải có ít nhất 3 ký tự'
        );
    });
    test('TC3: Username quá dài', ()=>{
        expect(validateUsername('a'.repeat(51))).toBe(
            'Username không được quá 50 ký tự'
        );
    });

    test('TC4: Username chứa khoảng trắng', ()=>{
        expect(validateUsername('abc def')).toBe(
            'Username không được chứa khoảng trắng'
        );
    })

    test('TC5: Username chứa ký tự đặc biệt', ()=>{
        expect(validateUsername('abc@123')).toBe(
            'Username không được chứa ký tự đặc biệt ngoài "." "-" "_"');
    });

    test('TC6 : Password rỗng', ()=>{
        expect(validatePassword('')).toBe(
            'Password không được để trống'
        );
    });

    test('TC7 : Password quá ngắn', ()=>{
        expect(validatePassword('12345')).toBe(
            'Password phải có ít nhất 6 ký tự'
        );
    });

    test('TC8 : Password quá dài', ()=>{
        expect(validatePassword('a1'.repeat(51))).toBe(
            'Password không được quá 100 ký tự'
        );
    });

    test('TC9 : Password không chứa cả chữ và số', ()=>{
        expect(validatePassword('abcabc')).toBe(
            'Password phải có cả chữ và số'
        );
    });

    test('TC10: Username hợp lệ',()=>{
        expect(validateUsername('abc123')).toBe(null);
    });
    test('TC11: Password hợp lệ',()=>{
        expect(validatePassword('abc123')).toBe(null);
    });

})
