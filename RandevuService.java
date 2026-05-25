package com.kuaforrys.kuafor_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.kuaforrys.kuafor_backend.entity.Berber;
import com.kuaforrys.kuafor_backend.service.BerberService;

@RestController
@RequestMapping("/api/berber")
@CrossOrigin("*") 
public class BerberController {

    private final BerberService service;

    public BerberController(BerberService service) {
        this.service = service;
    }

    @GetMapping("/liste")
    public List<Berber> berberListesi() {
        return service.tumBerberleriGetir();
    }

    @PostMapping("/ekle")
    public Berber yeniBerber(@RequestBody Berber berber) {
        return service.berberEkle(berber);
    }
}
