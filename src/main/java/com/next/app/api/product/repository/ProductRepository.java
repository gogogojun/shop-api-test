package com.next.app.api.product.repository;

import com.next.app.api.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory_Id(Long categoryId, Pageable pageable);
    Page<Product> findByNameContainingIgnoreCase(String q, Pageable pageable);
    Page<Product> findByCategory_IdAndNameContainingIgnoreCase(Long categoryId, String q, Pageable pageable);
}