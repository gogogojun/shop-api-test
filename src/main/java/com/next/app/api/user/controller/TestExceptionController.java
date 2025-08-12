package com.next.app.api.user.controller;

import com.next.app.exception.ErrorCode;
import com.next.app.exception.UserException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@Tag(name = "Exception Test Controller", description = "예외 처리 테스트 API")
public class TestExceptionController {
    
    @GetMapping("/user-not-found/{id}")
    @Operation(summary = "사용자 없음 예외 테스트", description = "사용자를 찾을 수 없는 예외를 발생시킵니다.")
    public String testUserNotFound(@PathVariable Long id) {
        throw UserException.userNotFound(id);
    }
    
    @GetMapping("/user-already-exists")
    @Operation(summary = "중복 사용자 예외 테스트", description = "이미 존재하는 사용자 예외를 발생시킵니다.")
    public String testUserAlreadyExists(@RequestParam String email) {
        throw UserException.userAlreadyExists(email);
    }
    
    @GetMapping("/invalid-input")
    @Operation(summary = "잘못된 입력 예외 테스트", description = "잘못된 입력값 예외를 발생시킵니다.")
    public String testInvalidInput() {
        throw new IllegalArgumentException("잘못된 입력값입니다.");
    }
    
    @GetMapping("/business-rule")
    @Operation(summary = "비즈니스 규칙 예외 테스트", description = "비즈니스 규칙 위반 예외를 발생시킵니다.")
    public String testBusinessRule() {
        throw new RuntimeException("비즈니스 규칙을 위반했습니다.");
    }
} 