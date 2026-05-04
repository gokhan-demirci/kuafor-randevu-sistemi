package com.kuaforrys.kuafor_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kuaforrys.kuafor_backend.entity.Musteri;

@Repository
public interface MusteriRepository extends JpaRepository<Musteri, Long> {
}
