package com.next.app.api.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "Hello Controller", description = "간단한 테스트 API")
public class HelloController {

    @GetMapping("/hello")
    @Operation(summary = "Hello 메시지 반환", description = "간단한 인사말을 반환합니다.")
    public String hello() {
        return "Hello, Spring Boot with Swagger!";
    }
} 