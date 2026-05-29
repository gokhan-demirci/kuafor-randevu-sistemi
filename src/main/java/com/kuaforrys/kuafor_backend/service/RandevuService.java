package com.kuaforrys.kuafor_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.repository.RandevuRepository;

@Service
public class RandevuService {

    private final RandevuRepository repository;

    public RandevuService(RandevuRepository repository) {
        this.repository = repository;
    }

    // Randevu kaydetme
    public Randevu randevuOlustur(Randevu randevu) {
        return repository.save(randevu);
    }

    // Tüm randevuları listeleme
    public List<Randevu> tumRandevulariGetir() {
        return repository.findAll();
    }
}