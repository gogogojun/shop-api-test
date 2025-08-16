package com.next.app.api.category.controller;

import com.next.app.api.category.controller.dto.CategoryDto;
import com.next.app.api.category.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;
    public CategoryController(CategoryService service) { this.service = service; }

    @GetMapping
    public List<CategoryDto> list() {
        return service.list();
    }
}