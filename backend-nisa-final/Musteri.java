package com.kuaforrys.kuafor_backend.controller;

import com.kuaforrys.kuafor_backend.entity.Berber;
import com.kuaforrys.kuafor_backend.service.BerberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/berber")
@CrossOrigin("*")
public class BerberController {

    private final BerberService service;

    public BerberController(BerberService service) {
        this.service = service;
    }

    @PostMapping("/ekle")
    public Berber berberEkle(@RequestBody Berber berber) {
        return service.berberEkle(berber);
    }

    @GetMapping("/liste")
    public List<Berber> berberleriListele() {
        return service.berberleriListele();
    }

    @GetMapping("/{id}")
    public Berber berberBul(@PathVariable Long id) {
        return service.berberBul(id);
    }
}