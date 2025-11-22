package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.productDTO.ProductRequest;
import com.example.demo.dto.productDTO.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
@Autowired
    private ProductService productService;

@GetMapping("/get/{id}")

    public ResponseEntity<?> getById(@PathVariable Integer id) {
        try {
            Product product = productService.getProduct(id);
            return ResponseEntity.ok(new ProductResponse(
                    product.getId(), product.getName(), product.getPrice(),
                    product.getDescription(), product.getQuantity(), product.getCategory()
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

@GetMapping("/getbyname/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name) {
        try {
            Product product = productService.getProductByName(name);
            return ResponseEntity.ok(new ProductResponse(
                    product.getId(), product.getName(), product.getPrice(),
                    product.getDescription(), product.getQuantity(), product.getCategory()
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }

@PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ProductRequest request) {
        try {
            Product product = new Product();
            product.setName(request.getName());
            product.setCategory(request.getCategory());
            product.setPrice(request.getPrice());
            product.setDescription(request.getDescription());
            product.setQuantity(request.getQuantity());

            productService.createProduct(product);
            return ResponseEntity.ok(new ProductResponse(
                    product.getId(), product.getName(), product.getPrice(),
                    product.getDescription(), product.getQuantity(), product.getCategory()
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

@PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProductRequest request) {
        try {
            Product newProduct = new Product();
            newProduct.setId(request.getId());
            newProduct.setName(request.getName());
            newProduct.setCategory(request.getCategory());
            newProduct.setDescription(request.getDescription());
            newProduct.setPrice(request.getPrice());
            newProduct.setQuantity(request.getQuantity());

            productService.updateProduct(request.getId(), newProduct);
            return ResponseEntity.ok(new ProductResponse(
                    newProduct.getId(), newProduct.getName(), newProduct.getPrice(),
                    newProduct.getDescription(), newProduct.getQuantity(), newProduct.getCategory()
            ));
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(Map.of("error", ex.getMessage()));
        }
    }



    @GetMapping
public ResponseEntity<?> getAllProducts() {
    try {
        // Lấy danh sách tất cả sản phẩm
        List<Product> products = productService.getAll();

        // Chuyển đổi sang ProductResponse
        List<ProductResponse> responseList = products.stream()
                .map(p -> new ProductResponse(
                        p.getId(), p.getName(), p.getPrice(),
                        p.getDescription(), p.getQuantity(), p.getCategory()
                ))
                .toList();

        return ResponseEntity.ok(responseList);
    } catch (RuntimeException ex) {
        return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
    }
}

}
