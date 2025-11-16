package com.example.demo.dto.productDTO;
import java.math.BigDecimal;

import com.example.demo.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse {
    private Integer id;
    private String name;
    private BigDecimal price;
    private String description;
    private int quantity;
    private Category category;
}
