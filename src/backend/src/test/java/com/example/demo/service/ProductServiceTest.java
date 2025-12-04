package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;

@ExtendWith(MockitoExtension.class)

 class ProductServiceTest {
    private ProductService productService;
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    private Product product;
    private Category category; 

    @BeforeEach
    void init() {
        productRepository = mock(ProductRepository.class);
        categoryRepository = mock(CategoryRepository.class );

        productService = new ProductService(productRepository, categoryRepository);
        product = new Product();
        
        //fake category
        category = new Category();
        category.setId(1);

        //fake product
        product = new Product();
        product.setId(1);
        product.setName("Laptop Dell");
        product.setPrice(new BigDecimal("15000000"));
        product.setQuantity(10);
        product.setDescription("High performance laptop");
        product.setCategory(category);

    }

    @Test
    @DisplayName("Create product success")
    void testCreateProductSuccess() {
        when(categoryRepository.existsById(1)).thenReturn(true);
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product result = productService.createProduct(product);

        assertEquals("Laptop Dell", result.getName());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Get Product Success")
    void testGetProductSuccess() {
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        Product result = productService.getProduct(1);

        assertEquals("Laptop Dell", result.getName());
        verify(productRepository, times(1)).findById(1);

    }

    @Test
    @DisplayName("Update Product Success")
    void testUpdateProduct() {
    when(productRepository.findById(1)).thenReturn(Optional.of(product));
    when(categoryRepository.existsById(1)).thenReturn(true);
    when(productRepository.save(any(Product.class))).thenReturn(product);

    Product updated = productService.updateProduct(1, product);

    assertEquals("Laptop Dell", updated.getName());
    verify(productRepository).save(any(Product.class));
    }

    @Test
    void testDeleteProduct() {
        when(productRepository.existsById(1)).thenReturn(true);

        productService.deleteProduct(1);

        verify(productRepository, times(1)).deleteById(1);
    }

    @Test
    void testGetAll() {
        List<Product> list = List.of(product);

        when(productRepository.findAll()).thenReturn(list);

        List<Product> result = productService.getAll(); //chỉ có 1 product dc set trong init nên expect list size = 1

        assertEquals(1,result.size());

    }

    // expect service throw exception
@Test
@DisplayName("Create product - name duplicate throws")
void testCreateProductNameDuplicate() {
    when(categoryRepository.existsById(1)).thenReturn(true);
    when(productRepository.findByName("Laptop Dell")).thenReturn(product);

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );
    // expect servive throw exception
    assertEquals("Tên sản phẩm bị trùng", ex.getMessage());
}

@Test
@DisplayName("Create product - invalid category throws")
void testCreateProductInvalidCategory() {
    product.getCategory().setId(2);
    when(categoryRepository.existsById(2)).thenReturn(false);

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );

    assertEquals("Category không hợp lệ hoặc không tồn tại!", ex.getMessage());
}


@Test
void testInvalidNameTooShort() {
    product.setName("ab");
    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );
    assertEquals("Tên sản phẩm phải từ 3-100 ký tự và không được rỗng!", ex.getMessage());
}

@Test
void testInvalidPrice() {
    product.setPrice(BigDecimal.ZERO);
    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );
    assertEquals("Giá sản phẩm phải > 0 và <= 999,999,999!", ex.getMessage());
}

@Test
void testInvalidQuantity() {
    product.setQuantity(-1);
    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );
    assertEquals("Số lượng phải >= 0 và <= 99,999!", ex.getMessage());
}

@Test
void testInvalidDescription() {
    product.setDescription("a".repeat(501));
    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.createProduct(product)
    );
    assertEquals("Mô tả không được vượt quá 500 ký tự!", ex.getMessage());
}

@Test
void testUpdateProductNotFound() {
    when(productRepository.findById(2)).thenReturn(Optional.empty());

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.updateProduct(2, product)
    );

    assertEquals("Không tìm thấy sản phẩm!", ex.getMessage());
}

@Test
void testUpdateProductNameDuplicate() {
    Product other = new Product();
    other.setId(2);
    other.setName("Laptop Dell");

    when(productRepository.findById(1)).thenReturn(Optional.of(product));
    when(productRepository.findAll()).thenReturn(List.of(product, other));

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.updateProduct(1, product)
    );

    assertEquals("Tên sản phẩm bị trùng", ex.getMessage());
}


@Test
void testDeleteProductNotFound() {
    when(productRepository.existsById(2)).thenReturn(false);

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.deleteProduct(2)
    );

    assertEquals("San pham ko ton tai", ex.getMessage());
}

@Test
void testGetProductByNameNotFound() {
    when(productRepository.findByName("NonExistent")).thenReturn(null);

    RuntimeException ex = assertThrows(RuntimeException.class, () ->
        productService.getProductByName("NonExistent")
    );

    assertEquals("Khong tim thay san pham", ex.getMessage());
}


    
}
