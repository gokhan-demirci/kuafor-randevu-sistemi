package com.kuaforrys.kuafor_backend.repository;

import com.kuaforrys.kuafor_backend.entity.Musteri;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusteriRepository extends JpaRepository<Musteri, Long> {
    Optional<Musteri> findByEmail(String email);
}