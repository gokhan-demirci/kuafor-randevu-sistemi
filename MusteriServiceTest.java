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
      
        Musteri sahteMusteri = new Musteri();
        sahteMusteri.setId(1L);
        sahteMusteri.setAdSoyad("Ecrin Yildiz");
        sahteMusteri.setTelefon("05551112233");

        
        when(repository.save(any(Musteri.class))).thenReturn(sahteMusteri);

     
        Musteri kaydedilen = service.musteriKaydet(sahteMusteri);

        
        assertNotNull(kaydedilen);
        assertEquals("Ecrin Yildiz", kaydedilen.getAdSoyad());
    }
}
