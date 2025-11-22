package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import java.util.Map;
import com.example.demo.dto.categoryDTO.CategoryResponse;
import com.example.demo.entity.Category;
import com.example.demo.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            List<Category> categories = categoryService.getAll();
            List<CategoryResponse> responseList = categories.stream()
                    .map(c -> new CategoryResponse(c.getId(), c.getName(),c.getDescription()))
                    .toList();
            return ResponseEntity.ok(responseList);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(500).body(Map.of("error", ex.getMessage()));
        }
    }
}

