export function validateProduct(product) {

    const { name, price, quantity, description, category, categories} = product;
    const errors = {};
    
    // Product Name 
    if (!name || name.trim() === '') {
        errors.name = 'Tên sản phẩm không được để trống';
    }
    else if (name.trim().length < 3)
        errors.name = 'Tên sản phẩm phải có ít nhất 3 ký tự'

    else if (name.trim().length > 100)
        errors.name = 'Tên sản phẩm không được quá 100 ký tự'

    // Price 
    if (/[^0-9-.]/.test(price))
        errors.price = 'Giá sản phẩm phải là số'

    else if (price <= 0)
        errors.price = 'Giá sản phẩm phải lớn hơn 0'

    else if (price > 999999999)
        errors.price = 'Giá sản phẩm phải nhỏ hơn 1 tỷ'

    // Quantity 
    if (/[^0-9-]/.test(quantity))
        errors.quantity = 'Số lượng sản phẩm phải là số nguyên dương'

    else if (quantity < 0)
        errors.quantity = 'Số lượng sản phẩm phải lớn hơn hoặc bằng 0';

    else if (quantity > 99999)
        errors.quantity = 'Số lượng sản phầm phải nhỏ hơn 100,000';

    // Description 
    if (description.trim().length > 500)
        errors.description = 'Mô tả sản phẩm không được quá 500 ký tự'

    // Category 
    if (!category)
        errors.category = 'Danh mục sản phẩm không được để trống'
    else if(!categories.some(c => c.id === category.id))
        errors.category = 'Danh mục sản phẩm không có sẵn';

    return errors;

}