package com.next.app.api.product.service;
// Product 클래스는 오류 없애기위한 파일이니 추후 삭제 예정

import com.next.app.api.product.entity.Product;
import com.next.app.api.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 전체 상품 조회
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ID로 상품 조회
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // 상품 등록
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // 상품 수정
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다: " + id));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());

        return productRepository.save(product);
    }

    // 상품 삭제
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
