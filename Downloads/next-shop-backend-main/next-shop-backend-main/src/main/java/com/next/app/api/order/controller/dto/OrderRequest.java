package com.next.app.api.order.controller.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private String status;
    private List<Item> items;

    @Data
    public static class Item {
        private Long productId;
        private int quantity;
        private BigDecimal price;
    }
}