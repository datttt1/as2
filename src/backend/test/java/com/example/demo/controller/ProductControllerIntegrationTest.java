package com.example.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.demo.controller.ProductController;
import com.example.demo.dto.productDTO.ProductRequest;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(ProductController.class)
 class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Autowired
    private ObjectMapper objectMapper;
    private Product product;
    private Category category;

    @BeforeEach
    void setUp() {
        product = new Product();
        category = new Category();

        category.setId(1);

        product.setId(1);
        product.setName("Laptop");
        product.setPrice(new BigDecimal(15000000));
        product.setDescription("Gaming Laptop");
        product.setQuantity(10);
        product.setCategory(category);


    }

      @Test
    @DisplayName("GET /api/product/get/{id} - Get one product")
    void testGetProductById() throws Exception {
        when(productService.getProduct(1)).thenReturn(product);

        mockMvc.perform(get("/api/product/get/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Laptop"));
    }

    @Test
    @DisplayName("GET /api/product - Get all products")
    void testGetAllProducts() throws Exception {
        List<Product> list = Arrays.asList(product);
        when(productService.getAll()).thenReturn(list);

        mockMvc.perform(get("/api/product")) // Cần sửa route controller nếu getAllProducts
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].name").value("Laptop"));
    }

    @Test
    @DisplayName("POST /api/product/create - Create product")
    void testCreateProduct() throws Exception {
        ProductRequest request = new ProductRequest();
        request.setName("Keyboard");
        request.setPrice(new BigDecimal(500000));
        request.setQuantity(20);
        request.setDescription("Mechanical keyboard");
        request.setCategory(category);

        Product product = new Product();
        product.setId(1);
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        product.setCategory(request.getCategory());

        when(productService.createProduct(any(Product.class))).thenReturn(product);

        mockMvc.perform(post("/api/product/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Keyboard"))
                .andExpect(jsonPath("$.quantity").value(20));
    }

    @Test
    @DisplayName("PUT /api/product/update - Update product")
    void testUpdateProduct() throws Exception {
        ProductRequest request = new ProductRequest();
        request.setId(1);
        request.setName("Keyboard Pro");
        request.setPrice(new BigDecimal(600000));
        request.setQuantity(15);
        request.setDescription("Updated Mechanical Keyboard");
        request.setCategory(category);

        Product updatedProduct = new Product();
        updatedProduct.setId(1);
        updatedProduct.setName(request.getName());
        updatedProduct.setPrice(request.getPrice());
        updatedProduct.setQuantity(request.getQuantity());
        updatedProduct.setDescription(request.getDescription());
        updatedProduct.setCategory(request.getCategory());

        when(productService.updateProduct(any(Integer.class), any(Product.class)))
                .thenReturn(updatedProduct);

        mockMvc.perform(put("/api/product/update")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Keyboard Pro"))
                .andExpect(jsonPath("$.price").value(600000));
    }

    @Test
    @DisplayName("DELETE /api/product/delete/{id} - Delete product")
    void testDeleteProduct() throws Exception {
        doNothing().when(productService).deleteProduct(1);

        mockMvc.perform(delete("/api/product/delete/1"))
                .andExpect(status().isOk());
    }

}
