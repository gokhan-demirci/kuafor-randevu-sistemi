package com.kuaforrys.kuafor_backend.service;

import org.springframework.stereotype.Service;
import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.repository.RandevuRepository;

@Service
public class RandevuService {

    private final RandevuRepository repository;

    public RandevuService(RandevuRepository repository) {
        this.repository = repository;
    }

    // Randevu kaydetme fonksiyonumuz
    public Randevu randevuOlustur(Randevu randevu) {
        return repository.save(randevu);
    }
}
