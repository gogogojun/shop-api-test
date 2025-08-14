package com.next.app.api.cart.repository;

import com.next.app.api.cart.entity.Cart;
import com.next.app.api.cart.entity.CartItem;
import com.next.app.api.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByCart(Cart cart);
}


