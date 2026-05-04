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

import com.kuaforrys.kuafor_backend.entity.Musteri;
import com.kuaforrys.kuafor_backend.repository.MusteriRepository;
import com.kuaforrys.kuafor_backend.service.MusteriService;

@ExtendWith(MockitoExtension.class)
public class MusteriServiceTest {

    @Mock
    private MusteriRepository repository;

    @InjectMocks
    private MusteriService service;

    @Test
    public void testMusteriKaydet() {
        // 1. Sahte bir müşteri hazırlıyoruz
        Musteri sahteMusteri = new Musteri();
        sahteMusteri.setId(1L);
        sahteMusteri.setAdSoyad("Ecrin Yildiz");
        sahteMusteri.setTelefon("05551112233");

        // 2. Veritabanı kaydını taklit ediyoruz
        when(repository.save(any(Musteri.class))).thenReturn(sahteMusteri);

        // 3. Kodumuzu çalıştırıyoruz
        Musteri kaydedilen = service.musteriKaydet(sahteMusteri);

        // 4. Sonucun doğruluğunu test ediyoruz
        assertNotNull(kaydedilen);
        assertEquals("Ecrin Yildiz", kaydedilen.getAdSoyad());
    }
}
