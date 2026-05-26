package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "randevu")
public class Randevu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "randevu_id")
    private Long randevuId;

    @Column(name = "tarih")
    private LocalDate tarih;

    @Column(name = "saat")
    private LocalTime saat;

    @Column(name = "durum")
    private String durum;

    @ManyToOne
    @JoinColumn(name = "musteri_id")
    private Musteri musteri;

    @ManyToOne
    @JoinColumn(name = "berber_id")
    private Berber berber;

    @ManyToOne
    @JoinColumn(name = "hizmet_id")
    private Hizmet hizmet;

    @Transient
    private String musteriTelefon;

    @Transient
    private String berberAdi;

    public Long getRandevuId() {
        return randevuId;
    }

    public void setRandevuId(Long randevuId) {
        this.randevuId = randevuId;
    }

    public Long getId() {
        return randevuId;
    }

    public void setId(Long id) {
        this.randevuId = id;
    }

    public LocalDate getTarih() {
        return tarih;
    }

    public void setTarih(LocalDate tarih) {
        this.tarih = tarih;
    }

    public LocalTime getSaat() {
        return saat;
    }

    public void setSaat(LocalTime saat) {
        this.saat = saat;
    }

    public void setSaat(String saat) {
        this.saat = LocalTime.parse(saat);
    }

    public String getDurum() {
        return durum;
    }

    public void setDurum(String durum) {
        this.durum = durum;
    }

    public Musteri getMusteri() {
        return musteri;
    }

    public void setMusteri(Musteri musteri) {
        this.musteri = musteri;
    }

    public Berber getBerber() {
        return berber;
    }

    public void setBerber(Berber berber) {
        this.berber = berber;
    }

    public Hizmet getHizmet() {
        return hizmet;
    }

    public void setHizmet(Hizmet hizmet) {
        this.hizmet = hizmet;
    }

    public String getMusteriTelefon() {
        if (musteri != null) {
            return musteri.getTelefon();
        }
        return musteriTelefon;
    }

    public void setMusteriTelefon(String musteriTelefon) {
        this.musteriTelefon = musteriTelefon;
    }

    public String getBerberAdi() {
        if (berber != null) {
            return berber.getAdSoyad();
        }
        return berberAdi;
    }

    public void setBerberAdi(String berberAdi) {
        this.berberAdi = berberAdi;
    }
}