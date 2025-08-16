package com.next.app.api.product.controller.dto;

import java.math.BigDecimal;

public record ProductDto(Long id, String name, BigDecimal price, String imageUrl, Long categoryId) {}
