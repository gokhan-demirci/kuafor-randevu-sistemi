package com.kuaforrys.kuafor_backend.controller;

import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.service.RandevuService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/randevu")
@CrossOrigin("*")
public class RandevuController {

    private final RandevuService service;

    public RandevuController(RandevuService service) {
        this.service = service;
    }

    @PostMapping("/olustur")
    public Randevu randevuOlustur(
            @RequestParam Long musteriId,
            @RequestParam Long berberId,
            @RequestParam Long hizmetId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate tarih,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime saat
    ) {
        return service.randevuOlustur(musteriId, berberId, hizmetId, tarih, saat);
    }

    @GetMapping("/liste")
    public List<Randevu> randevulariListele() {
        return service.randevulariListele();
    }

    @GetMapping("/{id}")
    public Randevu randevuBul(@PathVariable Long id) {
        return service.randevuBul(id);
    }

    @PutMapping("/{id}/iptal")
    public Randevu randevuIptalEt(@PathVariable Long id) {
        return service.randevuIptalEt(id);
    }
}