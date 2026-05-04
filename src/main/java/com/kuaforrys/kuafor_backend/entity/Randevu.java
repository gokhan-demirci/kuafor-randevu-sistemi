package com.kuaforrys.kuafor_backend.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Randevu {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String musteriTelefon;
    private String berberAdi;
    private String tarih;
    private String saat;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMusteriTelefon() { return musteriTelefon; }
    public void setMusteriTelefon(String musteriTelefon) { this.musteriTelefon = musteriTelefon; }

    public String getBerberAdi() { return berberAdi; }
    public void setBerberAdi(String berberAdi) { this.berberAdi = berberAdi; }

    public String getTarih() { return tarih; }
    public void setTarih(String tarih) { this.tarih = tarih; }

    public String getSaat() { return saat; }
    public void setSaat(String saat) { this.saat = saat; }
}
