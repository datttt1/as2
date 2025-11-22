package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;

import org.springframework.stereotype.Service;
@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getCategory(Integer id) {
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Khong tim thay category"));
    }


}
