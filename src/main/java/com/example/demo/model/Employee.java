package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "employee")
public class Employee {
    @Column(name = "uuid", nullable = false, unique = true)
    private String uuid = java.util.UUID.randomUUID().toString();

    @Column(name = "effective_date", nullable = false)
    private LocalDateTime effectiveDate = LocalDateTime.now();

    @Column(name = "crud_value", nullable = false)
    @Enumerated(EnumType.STRING)
    private CrudValue crudValue = CrudValue.CREATED;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Email
    @Column(unique = true, nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Employee manager;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability_status", nullable = false)
    private AvailabilityStatus availabilityStatus = AvailabilityStatus.AVAILABLE;

    @NotBlank
    @Column(nullable = false)
    private String position;

    @NotBlank
    @Column(nullable = false)
    private String password;

    // Enum for availability status
    public enum AvailabilityStatus {
        AVAILABLE, UNAVAILABLE
    }

    public enum CrudValue {
        CREATED, UPDATED, DELETED
    }

    // Default constructor
    public Employee() {
    }

    // Constructor with fields
    public Employee(String name, String email, Employee manager, AvailabilityStatus availabilityStatus, String position, String password) {
        this.name = name;
        this.email = email;
        this.manager = manager;
        this.availabilityStatus = availabilityStatus;
        this.position = position;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public AvailabilityStatus getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(AvailabilityStatus availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public String getUuid() {
        return uuid;
    }

    public LocalDateTime getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(LocalDateTime effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public CrudValue getCrudValue() {
        return crudValue;
    }

    public void setCrudValue(CrudValue crudValue) {
        this.crudValue = crudValue;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}