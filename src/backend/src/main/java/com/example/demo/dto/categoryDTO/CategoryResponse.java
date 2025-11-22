package com.example.demo.dto.categoryDTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryResponse {
    private Integer id;
    private String name;
    private String description;
}
