package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "musteri")
public class Musteri {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "musteri_id")
    private Long musteriId;

    @Column(name = "ad")
    private String ad;

    @Column(name = "soyad")
    private String soyad;

    @Column(name = "email")
    private String email;

    @Column(name = "sifre")
    private String sifre;

    @Column(name = "telefon")
    private String telefon;

    public Long getMusteriId() {
        return musteriId;
    }

    public void setMusteriId(Long musteriId) {
        this.musteriId = musteriId;
    }

    public Long getId() {
        return musteriId;
    }

    public void setId(Long id) {
        this.musteriId = id;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
  
    public String getSifre() {
        return sifre;
    }

    public void setSifre(String sifre) {
        this.sifre = sifre;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }
}