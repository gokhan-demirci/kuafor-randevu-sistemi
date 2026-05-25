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

import com.kuaforrys.kuafor_backend.entity.Berber;
import com.kuaforrys.kuafor_backend.repository.BerberRepository;
import com.kuaforrys.kuafor_backend.service.BerberService;

@ExtendWith(MockitoExtension.class)
public class BerberServiceTest {

    @Mock
    private BerberRepository repository;

    @InjectMocks
    private BerberService service;

    @Test
    public void testBerberEkle() {
        // 1. Sahte bir berber hazırlıyoruz
        Berber sahteBerber = new Berber();
        sahteBerber.setId(1L);
        sahteBerber.setAdSoyad("Ahmet Usta");
        sahteBerber.setUzmanlikAlani("Saç Kesimi");

        // 2. Veritabanı kaydını taklit ediyoruz
        when(repository.save(any(Berber.class))).thenReturn(sahteBerber);

        // 3. Kodumuzu çalıştırıyoruz
        Berber kaydedilen = service.berberEkle(sahteBerber);

        // 4. Sonucun doğruluğunu test ediyoruz
        assertNotNull(kaydedilen);
        assertEquals("Ahmet Usta", kaydedilen.getAdSoyad());
    }
}
