package com.kuaforrys.kuafor_backend.service;

import org.springframework.stereotype.Service;
import com.kuaforrys.kuafor_backend.entity.Musteri;
import com.kuaforrys.kuafor_backend.repository.MusteriRepository;

@Service
public class MusteriService {

    private final MusteriRepository repository;

    public MusteriService(MusteriRepository repository) {
        this.repository = repository;
    }

    // Müşteriyi veritabanına kaydetme fonksiyonu
    public Musteri musteriKaydet(Musteri musteri) {
        return repository.save(musteri);
    }
}
