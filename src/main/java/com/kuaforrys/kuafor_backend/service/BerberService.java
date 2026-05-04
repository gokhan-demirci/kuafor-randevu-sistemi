package com.kuaforrys.kuafor_backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import com.kuaforrys.kuafor_backend.entity.Berber;
import com.kuaforrys.kuafor_backend.repository.BerberRepository;

@Service
public class BerberService {

    private final BerberRepository repository;

    public BerberService(BerberRepository repository) {
        this.repository = repository;
    }

    // Sisteme yeni berber ekleme (Admin için)
    public Berber berberEkle(Berber berber) {
        return repository.save(berber);
    }

    // US-02: Berberin ve müşterilerin listedeki tüm berberleri görebilmesi
    public List<Berber> tumBerberleriGetir() {
        return repository.findAll();
    }
}
