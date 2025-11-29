package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

        List<Product> result = productService.getAll();

        assertEquals(1,result.size());

    }
    
}
