package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Berber {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String adSoyad;
    private String uzmanlikAlani;
    private String calismaSaatleri;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAdSoyad() { return adSoyad; }
    public void setAdSoyad(String adSoyad) { this.adSoyad = adSoyad; }

    public String getUzmanlikAlani() { return uzmanlikAlani; }
    public void setUzmanlikAlani(String uzmanlikAlani) { this.uzmanlikAlani = uzmanlikAlani; }

    public String getCalismaSaatleri() { return calismaSaatleri; }
    public void setCalismaSaatleri(String calismaSaatleri) { this.calismaSaatleri = calismaSaatleri; }
}
