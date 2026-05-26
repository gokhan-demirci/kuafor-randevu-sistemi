package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hizmet")
public class Hizmet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hizmet_id")
    private Long hizmetId;

    @Column(name = "hizmet_adi")
    private String hizmetAdi;

    @Column(name = "fiyat")
    private Integer fiyat;

    @Column(name = "sure")
    private Integer sure;

    public Long getHizmetId() {
        return hizmetId;
    }

    public void setHizmetId(Long hizmetId) {
        this.hizmetId = hizmetId;
    }

    public Long getId() {
        return hizmetId;
    }

    public void setId(Long id) {
        this.hizmetId = id;
    }

    public String getHizmetAdi() {
        return hizmetAdi;
    }

    public void setHizmetAdi(String hizmetAdi) {
        this.hizmetAdi = hizmetAdi;
    }

    public Integer getFiyat() {
        return fiyat;
    }

    public void setFiyat(Integer fiyat) {
        this.fiyat = fiyat;
    }

    public Integer getSure() {
        return sure;
    }

    public void setSure(Integer sure) {
        this.sure = sure;
    }
}