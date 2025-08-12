package com.next.app.api.product.repository;
// Product 클래스는 오류 없애기위한 파일이니 추후 삭제 예정

import com.next.app.api.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // 필요한 메서드 있으면 추가 가능
}
