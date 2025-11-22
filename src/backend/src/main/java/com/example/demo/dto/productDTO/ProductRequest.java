package com.example.demo.dto.productDTO;
import java.math.BigDecimal;

import com.example.demo.entity.Category;

import lombok.Data;
@Data
public class ProductRequest {
    private Integer id;
    private String name;
    private BigDecimal price;
    private String description;
    private int quantity;
    private Category category;
}
