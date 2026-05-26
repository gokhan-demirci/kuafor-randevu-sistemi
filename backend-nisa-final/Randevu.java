package com.kuaforrys.kuafor_backend.controller;

import com.kuaforrys.kuafor_backend.entity.Musteri;
import com.kuaforrys.kuafor_backend.service.MusteriService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musteri")
@CrossOrigin("*")
public class MusteriController {

    private final MusteriService service;

    public MusteriController(MusteriService service) {
        this.service = service;
    }

    @PostMapping("/kayit")
    public Musteri kayitOl(@RequestBody Musteri musteri) {
        return service.musteriKaydet(musteri);
    }

    @GetMapping("/liste")
    public List<Musteri> musterileriListele() {
        return service.musterileriListele();
    }

    @GetMapping("/{id}")
    public Musteri musteriBul(@PathVariable Long id) {
        return service.musteriBul(id);
    }
}