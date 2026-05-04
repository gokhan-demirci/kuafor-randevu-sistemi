package com.kuaforrys.kuafor_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.kuaforrys.kuafor_backend.entity.Musteri;
import com.kuaforrys.kuafor_backend.service.MusteriService;

@RestController
@RequestMapping("/api/musteri")
@CrossOrigin("*") 
public class MusteriController {

    private final MusteriService service;

    public MusteriController(MusteriService service) {
        this.service = service;
    }

    // Serkan ve Can'ın hazırladığı arayüzden gelen müşteri bilgilerini yakalıyoruz
    @PostMapping("/kayit")
    public Musteri kayitOl(@RequestBody Musteri musteri) {
        return service.musteriKaydet(musteri);
    }
}
