package com.next.app.api.product.controller;

import com.next.app.api.product.controller.dto.ProductDto;
import com.next.app.api.product.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    // 예: /api/products?categoryId=1&page=0&size=12&sort=id,desc
    @GetMapping
    public Page<ProductDto> list(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Long categoryId,
            @PageableDefault(size = 12, sort = "id") Pageable pageable
    ) {
        return service.list(q, categoryId, pageable);
    }

    @GetMapping("/{id}")
    public ProductDto get(@PathVariable Long id) {
        return service.get(id);
    }
}