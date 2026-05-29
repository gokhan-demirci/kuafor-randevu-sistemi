package com.kuaforrys.kuafor_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.service.RandevuService;

@RestController
@RequestMapping("/api/randevu")
@CrossOrigin("*")
public class RandevuController {

    private final RandevuService service;

    public RandevuController(RandevuService service) {
        this.service = service;
    }

    @PostMapping("/al")
    public Randevu randevuAl(@RequestBody Randevu randevu) {
        return service.randevuOlustur(randevu);
    }

    @GetMapping("/liste")
    public List<Randevu> randevuListesi() {
        return service.tumRandevulariGetir();
    }
}