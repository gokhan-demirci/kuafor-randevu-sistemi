package com.kuaforrys.kuafor_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.service.RandevuService;

@RestController
@RequestMapping("/api/randevu")
@CrossOrigin("*") // Bu satır Serkan ve Can'ın yazdığı arayüzün senin kodlarına sorunsuz bağlanmasını sağlar!
public class RandevuController {

    private final RandevuService service;

    public RandevuController(RandevuService service) {
        this.service = service;
    }

    // Serkan'ların arayüzden göndereceği randevu bilgilerini burada yakalıyoruz
    @PostMapping("/al")
    public Randevu randevuAl(@RequestBody Randevu randevu) {
        return service.randevuOlustur(randevu);
    }
}