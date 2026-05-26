package com.kuaforrys.kuafor_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "odeme")
public class Odeme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "odeme_id")
    private Long odemeId;

    @Column(name = "tutar")
    private Integer tutar;

    @Column(name = "odeme_tarihi")
    private LocalDate odemeTarihi;

    @Column(name = "odeme_yontemi")
    private String odemeYontemi;

    @ManyToOne
    @JoinColumn(name = "randevu_id")
    private Randevu randevu;

    public Long getOdemeId() {
        return odemeId;
    }

    public void setOdemeId(Long odemeId) {
        this.odemeId = odemeId;
    }

    public Long getId() {
        return odemeId;
    }

    public void setId(Long id) {
        this.odemeId = id;
    }

    public Integer getTutar() {
        return tutar;
    }

    public void setTutar(Integer tutar) {
        this.tutar = tutar;
    }

    public LocalDate getOdemeTarihi() {
        return odemeTarihi;
    }

    public void setOdemeTarihi(LocalDate odemeTarihi) {
        this.odemeTarihi = odemeTarihi;
    }

    public String getOdemeYontemi() {
        return odemeYontemi;
    }

    public void setOdemeYontemi(String odemeYontemi) {
        this.odemeYontemi = odemeYontemi;
    }

    public Randevu getRandevu() {
        return randevu;
    }

    public void setRandevu(Randevu randevu) {
        this.randevu = randevu;
    }
}
