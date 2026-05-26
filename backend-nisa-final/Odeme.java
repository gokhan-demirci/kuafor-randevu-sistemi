package com.kuaforrys.kuafor_backend.controller;

import com.kuaforrys.kuafor_backend.entity.Hizmet;
import com.kuaforrys.kuafor_backend.service.HizmetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hizmet")
@CrossOrigin("*")
public class HizmetController {

    private final HizmetService service;

    public HizmetController(HizmetService service) {
        this.service = service;
    }

    @PostMapping("/ekle")
    public Hizmet hizmetEkle(@RequestBody Hizmet hizmet) {
        return service.hizmetEkle(hizmet);
    }

    @GetMapping("/liste")
    public List<Hizmet> hizmetleriListele() {
        return service.hizmetleriListele();
    }

    @GetMapping("/{id}")
    public Hizmet hizmetBul(@PathVariable Long id) {
        return service.hizmetBul(id);
    }
}