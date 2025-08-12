package com.next.app.api.cart.controller;

import com.next.app.api.cart.entity.CartItem;
import com.next.app.api.cart.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@Tag(name = "Cart Controller", description = "장바구니 관리 API")
@CrossOrigin(origins = "http://localhost")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    @Operation(summary = "유저 장바구니 조회", description = "유저 ID로 장바구니 목록을 조회합니다.")
    public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long userId) {
        List<CartItem> items = cartService.getCartItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/{userId}/add")
    @Operation(summary = "장바구니에 상품 추가", description = "유저 장바구니에 상품과 수량을 추가합니다.")
    public ResponseEntity<CartItem> addProductToCart(
            @PathVariable Long userId,
            @RequestParam Long productId,
            @RequestParam int quantity) {

        CartItem item = cartService.addProductToCart(userId, productId, quantity);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{userId}/remove")
    @Operation(summary = "장바구니에서 상품 제거", description = "유저 장바구니에서 특정 상품을 제거합니다.")
    public ResponseEntity<Void> removeProductFromCart(
            @PathVariable Long userId,
            @RequestParam Long productId) {

        cartService.removeProductFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/clear")
    @Operation(summary = "장바구니 비우기", description = "유저 장바구니 내 모든 상품을 제거합니다.")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
}
