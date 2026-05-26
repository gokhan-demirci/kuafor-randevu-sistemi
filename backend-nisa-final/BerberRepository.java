package com.kuaforrys.kuafor_backend.controller;

import com.kuaforrys.kuafor_backend.entity.Odeme;
import com.kuaforrys.kuafor_backend.service.OdemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/odeme")
@CrossOrigin("*")
public class OdemeController {

    private final OdemeService service;

    public OdemeController(OdemeService service) {
        this.service = service;
    }

    @PostMapping("/yap")
    public Odeme odemeYap(
            @RequestParam Long randevuId,
            @RequestParam Integer tutar,
            @RequestParam String odemeYontemi
    ) {
        return service.odemeYap(randevuId, tutar, odemeYontemi);
    }

    @GetMapping("/liste")
    public List<Odeme> odemeleriListele() {
        return service.odemeleriListele();
    }
}