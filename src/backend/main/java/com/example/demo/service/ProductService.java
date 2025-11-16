package com.example.demo.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Product;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {
@Autowired
    private ProductRepository productRepository;
    private CategoryRepository categoryRepository;

    private void isValidProduct(Product product) {
        if(product.getName() == null        || 
           product.getName().length() < 3   ||
           product.getName().length() > 100 ||
           product.getName().trim().isEmpty()) {
            throw new RuntimeException("Tên sản phẩm phải từ 3-100 ký tự và không được rỗng!");
           }

        if(product.getPrice() == null ||
            product.getPrice().compareTo(BigDecimal.ZERO) <= 0 ||
            product.getPrice().compareTo(new BigDecimal("999999999")) > 0) {
                throw new RuntimeException("Giá sản phẩm phải > 0 và <= 999,999,999!");
            }

        if(product.getQuantity() < 0 || product.getQuantity() > 99999) {
            throw new RuntimeException("Số lượng phải >= 0 và <= 99,999!");
        }

        if(product.getDescription().length() > 500 || product.getDescription() == null ) {
            throw new RuntimeException("Mô tả không được vượt quá 500 ký tự!");
        }

        if(product.getCategory().getId() == null ||
            !categoryRepository.existsById(product.getCategory().getId())) {
            throw new RuntimeException("Category không hợp lệ hoặc không tồn tại!");
        }
    }

    public Product createProduct(Product product) {
        isValidProduct(product);
        return productRepository.save(product);
    }


    public Product updateProduct(Integer id, Product newproduct) {
        Product exsiting = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm!"));

        isValidProduct(newproduct);

        exsiting.setName(newproduct.getName());
        exsiting.setPrice(newproduct.getPrice());
        exsiting.setCategory((newproduct.getCategory()));
        exsiting.setQuantity(newproduct.getQuantity());
        exsiting.setDescription(newproduct.getDescription());

        return productRepository.save(exsiting);
    }

    public void deleteProduct(Integer id) {
        if(!productRepository.existsById(id)) {
            throw new RuntimeException("San pham ko ton tai");
        }

        productRepository.deleteById(id);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getProduct(Integer id) {
        return productRepository.findById(id). orElseThrow(() -> new RuntimeException("Khong tim thay san pham"));
    }
}
