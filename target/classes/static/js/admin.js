document.addEventListener('DOMContentLoaded', () => {
    let secilenSatir = null; // İşlem yapılan aktif satırı hafızada tutar

    // EVRENSEL KAPATMA: Herhangi bir modaldaki dış siyah alana tıklayınca kapatır
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    });

    // =========================================================================
    // 1. GÖSTERGE PANELİ (`admin.html`) & RANDEVULAR (`randevular.html`) MANTIĞI
    // =========================================================================
    const tabloGosterge = document.getElementById('tabloGosterge');
    const tabloRandevular = document.getElementById('tabloRandevular');

    const modalRandevuOnay = document.getElementById('modalRandevuOnay');
    const modalRandevuTamamla = document.getElementById('modalRandevuTamamla');
    const modalRandevuIptal = document.getElementById('modalRandevuIptal');

    // İptal (Vazgeç) butonlarının olayları
    if (document.getElementById('btnRandevuOnayIptal')) document.getElementById('btnRandevuOnayIptal').addEventListener('click', () => modalRandevuOnay.style.display = 'none');
    if (document.getElementById('btnRandevuTamamlaIptal')) document.getElementById('btnRandevuTamamlaIptal').addEventListener('click', () => modalRandevuTamamla.style.display = 'none');
    if (document.getElementById('btnRandevuIptalIptal')) document.getElementById('btnRandevuIptalIptal').addEventListener('click', () => modalRandevuIptal.style.display = 'none');

    // Tablolardaki Onayla/Tamamla/İptal butonlarını yakalama fonksiyonu
    const randevuTabloDinle = (tablo) => {
        if (!tablo) return;
        tablo.addEventListener('click', (e) => {
            if (e.target.textContent.trim() === 'Onayla') {
                secilenSatir = e.target.closest('tr');
                modalRandevuOnay.style.display = 'flex';
            } else if (e.target.textContent.trim() === 'Tamamla') {
                secilenSatir = e.target.closest('tr');
                modalRandevuTamamla.style.display = 'flex';
            } else if (e.target.textContent.trim() === 'İptal') {
                secilenSatir = e.target.closest('tr');
                modalRandevuIptal.style.display = 'flex';
            }
        });
    };
    randevuTabloDinle(tabloGosterge);
    randevuTabloDinle(tabloRandevular);

    // MODAL İÇİNDEKİ "EVET" BUTONLARI EYLEMLERİ
    if (document.getElementById('btnRandevuOnayEvet')) {
        document.getElementById('btnRandevuOnayEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');
                durumHucresi.className = 'badge approved';
                durumHucresi.textContent = 'Onaylandı';
                
                // Butonu otomatik "Tamamla" butonuna dönüştür
                const islemButonu = secilenSatir.querySelector('.action-btn');
                if (islemButonu && islemButonu.textContent.trim() === 'Onayla') {
                    islemButonu.textContent = 'Tamamla';
                }
                modalRandevuOnay.style.display = 'none';
            }
        });
    }

    if (document.getElementById('btnRandevuTamamlaEvet')) {
        document.getElementById('btnRandevuTamamlaEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');
                durumHucresi.className = 'badge approved';
                durumHucresi.textContent = 'Tamamlandı';
                durumHucresi.style.borderColor = '#2ecc71'; // Yeşil çerçeve
                
                // İşlem alanını kapat
                const islemHucresi = secilenSatir.cells[secilenSatir.cells.length - 1];
                islemHucresi.innerHTML = '<span style="color: var(--text-muted); font-size: 12px;">İşlem Yok</span>';
                
                modalRandevuTamamla.style.display = 'none';
            }
        });
    }

    if (document.getElementById('btnRandevuIptalEvet')) {
        document.getElementById('btnRandevuIptalEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');
                durumHucresi.className = 'badge pending';
                durumHucresi.textContent = 'İptal Edildi';
                
                const islemHucresi = secilenSatir.cells[secilenSatir.cells.length - 1];
                islemHucresi.innerHTML = '<span style="color: var(--text-muted); font-size: 12px;">İptal Edildi</span>';
                
                modalRandevuIptal.style.display = 'none';
            }
        });
    }

    // =========================================================================
    // 2. BERBER YÖNETİMİ MANTIĞI (`berber-yonetimi.html`)
    // =========================================================================
    const tabloBerber = document.getElementById('tabloBerber');
    const modalBerberEkle = document.getElementById('modalBerberEkle');
    const btnYeniBerber = document.getElementById('btnYeniBerber');
    const btnBerberEkleIptal = document.getElementById('btnModalIptal');
    const formBerberEkle = document.querySelector('#modalBerberEkle form');
    const modalBerberDuzenle = document.getElementById('modalBerberDuzenle');
    const btnBerberDuzenleIptal = document.getElementById('btnDuzenleIptal');
    const formBerberDuzenle = document.querySelector('#modalBerberDuzenle form');
    const modalBerberSil = document.getElementById('modalSilOnay');

    if (btnYeniBerber) btnYeniBerber.addEventListener('click', () => modalBerberEkle.style.display = 'flex');
    if (btnBerberEkleIptal) btnBerberEkleIptal.addEventListener('click', () => modalBerberEkle.style.display = 'none');
    if (btnBerberDuzenleIptal) btnBerberDuzenleIptal.addEventListener('click', () => modalBerberDuzenle.style.display = 'none');
    if (document.getElementById('btnSilIptal')) document.getElementById('btnSilIptal').addEventListener('click', () => modalBerberSil.style.display = 'none');

    if (formBerberEkle) {
        formBerberEkle.addEventListener('submit', (e) => {
            e.preventDefault();
            const adSoyad = formBerberEkle.querySelectorAll('input')[0].value;
            const uzmanlik = formBerberEkle.querySelectorAll('input')[2].value;
            const yeniSatir = `<tr><td>${adSoyad}</td><td>${uzmanlik}</td><td><span class="badge approved">Aktif</span></td><td><button class="action-btn" style="font-size: 12px; margin-right: 5px;">Düzenle</button><button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">Sil</button></td></tr>`;
            tabloBerber.querySelector('tbody').insertAdjacentHTML('beforeend', yeniSatir);
            modalBerberEkle.style.display = 'none';
            formBerberEkle.reset();
        });
    }

    if (tabloBerber) {
        tabloBerber.querySelector('tbody').addEventListener('click', (e) => {
            if (e.target.textContent === 'Sil') { secilenSatir = e.target.closest('tr'); modalBerberSil.style.display = 'flex'; }
            if (e.target.textContent === 'Düzenle') {
                secilenSatir = e.target.closest('tr');
                document.getElementById('editAdSoyad').value = secilenSatir.children[0].textContent;
                document.getElementById('editUzmanlik').value = secilenSatir.children[1].textContent;
                modalBerberDuzenle.style.display = 'flex';
            }
        });
    }
    if (document.getElementById('btnSilOnay')) {
        document.getElementById('btnSilOnay').addEventListener('click', () => {
            if (secilenSatir) { secilenSatir.remove(); modalBerberSil.style.display = 'none'; }
        });
    }
    if (formBerberDuzenle) {
        formBerberDuzenle.addEventListener('submit', (e) => {
            e.preventDefault();
            if (secilenSatir) {
                secilenSatir.children[0].textContent = document.getElementById('editAdSoyad').value;
                secilenSatir.children[1].textContent = document.getElementById('editUzmanlik').value;
                modalBerberDuzenle.style.display = 'none';
            }
        });
    }

    // =========================================================================
    // 3. HİZMETLER & FİYATLAR MANTIĞI (`hizmetler-fiyatlar.html`)
    // =========================================================================
    const tabloHizmetler = document.getElementById('tabloHizmetler');
    const modalHizmetEkle = document.getElementById('modalHizmetEkle');
    const btnYeniHizmet = document.getElementById('btnYeniHizmet');
    const btnHizmetEkleIptal = document.getElementById('btnHizmetEkleIptal');
    const formHizmetEkle = document.querySelector('#modalHizmetEkle form');
    const modalHizmetDuzenle = document.getElementById('modalHizmetDuzenle');
    const btnHizmetDuzenleIptal = document.getElementById('btnHizmetDuzenleIptal');
    const formHizmetDuzenle = document.querySelector('#modalHizmetDuzenle form');
    const modalHizmetSil = document.getElementById('modalHizmetSilOnay');

    if (btnYeniHizmet) btnYeniHizmet.addEventListener('click', () => modalHizmetEkle.style.display = 'flex');
    if (btnHizmetEkleIptal) btnHizmetEkleIptal.addEventListener('click', () => modalHizmetEkle.style.display = 'none');
    if (btnHizmetDuzenleIptal) btnHizmetDuzenleIptal.addEventListener('click', () => modalHizmetDuzenle.style.display = 'none');
    if (document.getElementById('btnHizmetSilIptal')) document.getElementById('btnHizmetSilIptal').addEventListener('click', () => modalHizmetSil.style.display = 'none');

    if (formHizmetEkle) {
        formHizmetEkle.addEventListener('submit', (e) => {
            e.preventDefault();
            const ad = document.getElementById('hizmetAd').value;
            const sure = document.getElementById('hizmetSure').value;
            const fiyat = document.getElementById('hizmetFiyat').value;
            const yeniSatir = `<tr><td>${ad}</td><td>${sure} Dakika</td><td style="color: var(--gold); font-weight: bold;">₺${fiyat}</td><td><span class="badge approved">Aktif</span></td><td><button class="action-btn" style="font-size: 12px; margin-right: 5px;">Düzenle</button><button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">Kaldır</button></td></tr>`;
            tabloHizmetler.querySelector('tbody').insertAdjacentHTML('beforeend', yeniSatir);
            modalHizmetEkle.style.display = 'none';
            formHizmetEkle.reset();
        });
    }

    if (tabloHizmetler) {
        tabloHizmetler.querySelector('tbody').addEventListener('click', (e) => {
            if (e.target.textContent === 'Kaldır') { secilenSatir = e.target.closest('tr'); modalHizmetSil.style.display = 'flex'; }
            if (e.target.textContent === 'Düzenle') {
                secilenSatir = e.target.closest('tr');
                document.getElementById('editHizmetAd').value = secilenSatir.children[0].textContent;
                document.getElementById('editHizmetSure').value = secilenSatir.children[1].textContent.replace(' Dakika', '');
                document.getElementById('editHizmetFiyat').value = secilenSatir.children[2].textContent.replace('₺', '');
                modalHizmetDuzenle.style.display = 'flex';
            }
        });
    }
    if (document.getElementById('btnHizmetSilOnay')) {
        document.getElementById('btnHizmetSilOnay').addEventListener('click', () => {
            if (secilenSatir) { secilenSatir.remove(); modalHizmetSil.style.display = 'none'; }
        });
    }
    if (formHizmetDuzenle) {
        formHizmetDuzenle.addEventListener('submit', (e) => {
            e.preventDefault();
            if (secilenSatir) {
                secilenSatir.children[0].textContent = document.getElementById('editHizmetAd').value;
                secilenSatir.children[1].textContent = document.getElementById('editHizmetSure').value + ' Dakika';
                secilenSatir.children[2].textContent = '₺' + document.getElementById('editHizmetFiyat').value;
                modalHizmetDuzenle.style.display = 'none';
            }
        });
    }
});