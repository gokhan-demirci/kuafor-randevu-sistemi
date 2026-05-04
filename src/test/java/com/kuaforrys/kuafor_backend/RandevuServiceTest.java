package com.kuaforrys.kuafor_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.kuaforrys.kuafor_backend.entity.Randevu;
import com.kuaforrys.kuafor_backend.repository.RandevuRepository;
import com.kuaforrys.kuafor_backend.service.RandevuService;

@ExtendWith(MockitoExtension.class)
public class RandevuServiceTest {

    @Mock
    private RandevuRepository repository;

    @InjectMocks
    private RandevuService service;

    @Test
    public void testRandevuOlustur() {
        
        Randevu sahteRandevu = new Randevu();
        sahteRandevu.setId(1L);
        sahteRandevu.setMusteriTelefon("05551234567");
        sahteRandevu.setBerberAdi("Selim Usta");
        sahteRandevu.setSaat("14:00");

        
        when(repository.save(any(Randevu.class))).thenReturn(sahteRandevu);

        // Kodu çalıştırıyoruz
        Randevu kaydedilenRandevu = service.randevuOlustur(sahteRandevu);

        // Sonuçları kontrol ediyoruz
        assertNotNull(kaydedilenRandevu);
        assertEquals("Selim Usta", kaydedilenRandevu.getBerberAdi());
    }
}
