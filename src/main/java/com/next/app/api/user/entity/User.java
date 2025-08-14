package com.next.app.api.user.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String delivery_address;

    @Column(length = 20)
    private String phone_number;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updateAt;


    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updateAt = java.time.LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {updateAt = java.time.LocalDateTime.now();}
}