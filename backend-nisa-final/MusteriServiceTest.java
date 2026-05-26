package com.kuaforrys.kuafor_backend.repository;

import com.kuaforrys.kuafor_backend.entity.Randevu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;

public interface RandevuRepository extends JpaRepository<Randevu, Long> {

    boolean existsByBerber_BerberIdAndTarihAndSaat(
            Long berberId,
            LocalDate tarih,
            LocalTime saat
    );
}