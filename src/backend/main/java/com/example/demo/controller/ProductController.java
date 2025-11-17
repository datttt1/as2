package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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

@PostMapping("/create")
    public ProductResponse create(@RequestBody ProductRequest request ) {
        Product product = new Product();
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setQuantity(request.getQuantity());

        productService.createProduct(product);
        return new ProductResponse(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getQuantity(), product.getCategory());
    }

@PutMapping("/update")
    public ProductResponse update(@RequestBody ProductRequest request ) {
        Product newProduct = new Product();
        newProduct.setName(request.getName());
        newProduct.setCategory(request.getCategory());
        newProduct.setDescription(request.getDescription());
        newProduct.setPrice(request.getPrice());
        newProduct.setQuantity(request.getQuantity());

        productService.updateProduct(request.getId(), newProduct);
        return new ProductResponse(newProduct.getId(), newProduct.getName(), newProduct.getPrice(), newProduct.getDescription(), newProduct.getQuantity(), newProduct.getCategory());

    }

@DeleteMapping("/delete/{id}")
public void delete(@PathVariable Integer id) {
    productService.deleteProduct(id);
}

@GetMapping("/get/{id}")

    public ProductResponse getById(@PathVariable Integer id) {
        Product product = new Product();
        product = productService.getProduct(id);
        return new ProductResponse(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getQuantity(), product.getCategory());
 

    }

@GetMapping("/getbyname/{name}")
    public ProductResponse getByName(@PathVariable String name) {
        Product product = productService.getProductByName(name);
        return new ProductResponse(product.getId(), product.getName(), product.getPrice(), product.getDescription(), product.getQuantity(), product.getCategory());

    }


}
