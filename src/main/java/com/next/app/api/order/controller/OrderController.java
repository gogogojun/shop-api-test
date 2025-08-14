package com.next.app.api.order.controller;

import com.next.app.api.order.controller.dto.OrderRequest;
import com.next.app.api.order.entity.Order;
import com.next.app.api.order.entity.OrderItem;
import com.next.app.api.order.service.OrderService;
import com.next.app.api.product.entity.Product;
import com.next.app.api.user.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Tag(name = "Order Controller", description = "주문 관리 API")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    @Operation(summary = "모든 주문 조회", description = "등록된 모든 주문 목록 반환.")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    @Operation(summary = "주문 조회", description = "ID로 특정 주문 조회.")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "주문 생성", description = "새로운 주문 생성.")
    public Order createOrder(@RequestBody OrderRequest request) {
        User user = new User();
        user.setId(request.getUserId());

        List<OrderItem> items = request.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            Product product = new Product();
            product.setId(i.getProductId());
            item.setProduct(product);
            item.setQuantity(i.getQuantity());
            item.setPrice(i.getPrice());
            return item;
        }).toList();

        return orderService.createOrder(user, items, request.getStatus());
    }

    @PutMapping("/{id}")
    @Operation(summary = "주문 수정", description = "주문 상태 수정. (PENDING, PAID, SHIPPED, CANCELLED)")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestParam String status) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "주문 삭제", description = "주문 삭제.")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }
}
