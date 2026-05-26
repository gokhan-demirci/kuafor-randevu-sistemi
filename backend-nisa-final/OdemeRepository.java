package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "berber")
public class Berber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "berber_id")
    private Long berberId;

    @Column(name = "ad")
    private String ad;

    @Column(name = "soyad")
    private String soyad;

    @Column(name = "uzmanlik_alani")
    private String uzmanlikAlani;

    @Column(name = "calisma_saatleri")
    private String calismaSaatleri;

    public Long getBerberId() {
        return berberId;
    }

    public void setBerberId(Long berberId) {
        this.berberId = berberId;
    }

    public Long getId() {
        return berberId;
    }

    public void setId(Long id) {
        this.berberId = id;
    }

    public String getAd() {
        return ad;
    }

    public void setAd(String ad) {
        this.ad = ad;
    }

    public String getSoyad() {
        return soyad;
    }

    public void setSoyad(String soyad) {
        this.soyad = soyad;
    }

    public String getAdSoyad() {
        if (soyad == null || soyad.isBlank()) {
            return ad;
        }
        return ad + " " + soyad;
    }

    public void setAdSoyad(String adSoyad) {
        if (adSoyad == null) {
            return;
        }

        String[] parcalar = adSoyad.trim().split(" ", 2);
        this.ad = parcalar[0];

        if (parcalar.length > 1) {
            this.soyad = parcalar[1];
        }
    }

    public String getUzmanlikAlani() {
        return uzmanlikAlani;
    }

    public void setUzmanlikAlani(String uzmanlikAlani) {
        this.uzmanlikAlani = uzmanlikAlani;
    }

    public String getCalismaSaatleri() {
        return calismaSaatleri;
    }

    public void setCalismaSaatleri(String calismaSaatleri) {
        this.calismaSaatleri = calismaSaatleri;
    }
}