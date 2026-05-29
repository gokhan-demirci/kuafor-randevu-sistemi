document.addEventListener('DOMContentLoaded', () => {
    let secilenSatir = null;

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

    if (document.getElementById('btnRandevuOnayIptal')) {
        document.getElementById('btnRandevuOnayIptal').addEventListener('click', () => {
            if (modalRandevuOnay) modalRandevuOnay.style.display = 'none';
        });
    }

    if (document.getElementById('btnRandevuTamamlaIptal')) {
        document.getElementById('btnRandevuTamamlaIptal').addEventListener('click', () => {
            if (modalRandevuTamamla) modalRandevuTamamla.style.display = 'none';
        });
    }

    if (document.getElementById('btnRandevuIptalIptal')) {
        document.getElementById('btnRandevuIptalIptal').addEventListener('click', () => {
            if (modalRandevuIptal) modalRandevuIptal.style.display = 'none';
        });
    }

    const randevuTabloDinle = (tablo) => {
        if (!tablo) return;

        tablo.addEventListener('click', (e) => {
            const butonYazisi = e.target.textContent.trim();

            if (butonYazisi === 'Onayla') {
                secilenSatir = e.target.closest('tr');
                if (modalRandevuOnay) modalRandevuOnay.style.display = 'flex';
            }

            else if (butonYazisi === 'Tamamla') {
                secilenSatir = e.target.closest('tr');
                if (modalRandevuTamamla) modalRandevuTamamla.style.display = 'flex';
            }

            else if (butonYazisi === 'İptal') {
                secilenSatir = e.target.closest('tr');
                if (modalRandevuIptal) modalRandevuIptal.style.display = 'flex';
            }
        });
    };

    randevuTabloDinle(tabloGosterge);
    randevuTabloDinle(tabloRandevular);

    if (document.getElementById('btnRandevuOnayEvet')) {
        document.getElementById('btnRandevuOnayEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');

                if (durumHucresi) {
                    durumHucresi.className = 'badge approved';
                    durumHucresi.textContent = 'Onaylandı';
                }

                const islemButonu = secilenSatir.querySelector('.action-btn');

                if (islemButonu && islemButonu.textContent.trim() === 'Onayla') {
                    islemButonu.textContent = 'Tamamla';
                }

                if (modalRandevuOnay) modalRandevuOnay.style.display = 'none';
            }
        });
    }

    if (document.getElementById('btnRandevuTamamlaEvet')) {
        document.getElementById('btnRandevuTamamlaEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');

                if (durumHucresi) {
                    durumHucresi.className = 'badge approved';
                    durumHucresi.textContent = 'Tamamlandı';
                    durumHucresi.style.borderColor = '#2ecc71';
                }

                const islemHucresi = secilenSatir.cells[secilenSatir.cells.length - 1];
                islemHucresi.innerHTML = '<span style="color: var(--text-muted); font-size: 12px;">İşlem Yok</span>';

                if (modalRandevuTamamla) modalRandevuTamamla.style.display = 'none';
            }
        });
    }

    if (document.getElementById('btnRandevuIptalEvet')) {
        document.getElementById('btnRandevuIptalEvet').addEventListener('click', () => {
            if (secilenSatir) {
                const durumHucresi = secilenSatir.querySelector('.badge');

                if (durumHucresi) {
                    durumHucresi.className = 'badge pending';
                    durumHucresi.textContent = 'İptal Edildi';
                }

                const islemHucresi = secilenSatir.cells[secilenSatir.cells.length - 1];
                islemHucresi.innerHTML = '<span style="color: var(--text-muted); font-size: 12px;">İptal Edildi</span>';

                if (modalRandevuIptal) modalRandevuIptal.style.display = 'none';
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

    if (btnYeniBerber) {
        btnYeniBerber.addEventListener('click', () => {
            if (modalBerberEkle) modalBerberEkle.style.display = 'flex';
        });
    }

    if (btnBerberEkleIptal) {
        btnBerberEkleIptal.addEventListener('click', () => {
            if (modalBerberEkle) modalBerberEkle.style.display = 'none';
        });
    }

    if (btnBerberDuzenleIptal) {
        btnBerberDuzenleIptal.addEventListener('click', () => {
            if (modalBerberDuzenle) modalBerberDuzenle.style.display = 'none';
        });
    }

    if (document.getElementById('btnSilIptal')) {
        document.getElementById('btnSilIptal').addEventListener('click', () => {
            if (modalBerberSil) modalBerberSil.style.display = 'none';
        });
    }

    if (formBerberEkle) {
        formBerberEkle.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (typeof api === 'undefined') {
                alert('api.js dosyası yüklenmemiş. HTML dosyasında admin.jsden önce api.js ekli olmalı.');
                return;
            }

            const inputs = formBerberEkle.querySelectorAll('input');

            const yeniBerber = {
                adSoyad: inputs[0].value.trim(),
                uzmanlikAlani: inputs[2].value.trim(),
                calismaSaatleri: '09:00 - 20:00'
            };

            try {
                const kaydedilenBerber = await api.berberEkle(yeniBerber);

                const yeniSatir = `
                    <tr data-id="${kaydedilenBerber.id}">
                        <td>${kaydedilenBerber.adSoyad}</td>
                        <td>${kaydedilenBerber.uzmanlikAlani}</td>
                        <td><span class="badge approved">Aktif</span></td>
                        <td>
                            <button class="action-btn" style="font-size: 12px; margin-right: 5px;">Düzenle</button>
                            <button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">Sil</button>
                        </td>
                    </tr>
                `;

                if (tabloBerber) {
                    tabloBerber.querySelector('tbody').insertAdjacentHTML('beforeend', yeniSatir);
                }

                if (modalBerberEkle) modalBerberEkle.style.display = 'none';
                formBerberEkle.reset();

            } catch (error) {
                console.error('Berber eklenemedi:', error);
                alert('Berber backend tarafına kaydedilemedi.');
            }
        });
    }

    if (tabloBerber) {
        tabloBerber.querySelector('tbody').addEventListener('click', (e) => {
            const butonYazisi = e.target.textContent.trim();

            if (butonYazisi === 'Sil') {
                secilenSatir = e.target.closest('tr');
                if (modalBerberSil) modalBerberSil.style.display = 'flex';
            }

            if (butonYazisi === 'Düzenle') {
                secilenSatir = e.target.closest('tr');

                document.getElementById('editAdSoyad').value = secilenSatir.children[0].textContent;
                document.getElementById('editUzmanlik').value = secilenSatir.children[1].textContent;

                if (modalBerberDuzenle) modalBerberDuzenle.style.display = 'flex';
            }
        });
    }

    if (document.getElementById('btnSilOnay')) {
        document.getElementById('btnSilOnay').addEventListener('click', () => {
            if (secilenSatir) {
                secilenSatir.remove();
                if (modalBerberSil) modalBerberSil.style.display = 'none';
            }
        });
    }

    if (formBerberDuzenle) {
        formBerberDuzenle.addEventListener('submit', (e) => {
            e.preventDefault();

            if (secilenSatir) {
                secilenSatir.children[0].textContent = document.getElementById('editAdSoyad').value;
                secilenSatir.children[1].textContent = document.getElementById('editUzmanlik').value;

                if (modalBerberDuzenle) modalBerberDuzenle.style.display = 'none';
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

    if (btnYeniHizmet) {
        btnYeniHizmet.addEventListener('click', () => {
            if (modalHizmetEkle) modalHizmetEkle.style.display = 'flex';
        });
    }

    if (btnHizmetEkleIptal) {
        btnHizmetEkleIptal.addEventListener('click', () => {
            if (modalHizmetEkle) modalHizmetEkle.style.display = 'none';
        });
    }

    if (btnHizmetDuzenleIptal) {
        btnHizmetDuzenleIptal.addEventListener('click', () => {
            if (modalHizmetDuzenle) modalHizmetDuzenle.style.display = 'none';
        });
    }

    if (document.getElementById('btnHizmetSilIptal')) {
        document.getElementById('btnHizmetSilIptal').addEventListener('click', () => {
            if (modalHizmetSil) modalHizmetSil.style.display = 'none';
        });
    }

    if (formHizmetEkle) {
        formHizmetEkle.addEventListener('submit', (e) => {
            e.preventDefault();

            const ad = document.getElementById('hizmetAd').value;
            const sure = document.getElementById('hizmetSure').value;
            const fiyat = document.getElementById('hizmetFiyat').value;

            const yeniSatir = `
                <tr>
                    <td>${ad}</td>
                    <td>${sure} Dakika</td>
                    <td style="color: var(--gold); font-weight: bold;">₺${fiyat}</td>
                    <td><span class="badge approved">Aktif</span></td>
                    <td>
                        <button class="action-btn" style="font-size: 12px; margin-right: 5px;">Düzenle</button>
                        <button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">Kaldır</button>
                    </td>
                </tr>
            `;

            if (tabloHizmetler) {
                tabloHizmetler.querySelector('tbody').insertAdjacentHTML('beforeend', yeniSatir);
            }

            if (modalHizmetEkle) modalHizmetEkle.style.display = 'none';
            formHizmetEkle.reset();
        });
    }

    if (tabloHizmetler) {
        tabloHizmetler.querySelector('tbody').addEventListener('click', (e) => {
            const butonYazisi = e.target.textContent.trim();

            if (butonYazisi === 'Kaldır') {
                secilenSatir = e.target.closest('tr');
                if (modalHizmetSil) modalHizmetSil.style.display = 'flex';
            }

            if (butonYazisi === 'Düzenle') {
                secilenSatir = e.target.closest('tr');

                document.getElementById('editHizmetAd').value = secilenSatir.children[0].textContent;
                document.getElementById('editHizmetSure').value = secilenSatir.children[1].textContent.replace(' Dakika', '');
                document.getElementById('editHizmetFiyat').value = secilenSatir.children[2].textContent.replace('₺', '');

                if (modalHizmetDuzenle) modalHizmetDuzenle.style.display = 'flex';
            }
        });
    }

    if (document.getElementById('btnHizmetSilOnay')) {
        document.getElementById('btnHizmetSilOnay').addEventListener('click', () => {
            if (secilenSatir) {
                secilenSatir.remove();
                if (modalHizmetSil) modalHizmetSil.style.display = 'none';
            }
        });
    }

    if (formHizmetDuzenle) {
        formHizmetDuzenle.addEventListener('submit', (e) => {
            e.preventDefault();

            if (secilenSatir) {
                secilenSatir.children[0].textContent = document.getElementById('editHizmetAd').value;
                secilenSatir.children[1].textContent = document.getElementById('editHizmetSure').value + ' Dakika';
                secilenSatir.children[2].textContent = '₺' + document.getElementById('editHizmetFiyat').value;

                if (modalHizmetDuzenle) modalHizmetDuzenle.style.display = 'none';
            }
        });
    }

    // =========================================================================
    // 4. BACKEND'DEN BERBER LİSTESİ ÇEKME
    // =========================================================================
    async function loadBerberYonetimi() {
        const tabloBerber = document.getElementById('tabloBerber');

        if (!tabloBerber || typeof api === 'undefined') {
            return;
        }

        try {
            const berberler = await api.berberleriGetir();
            const tbody = tabloBerber.querySelector('tbody');

            if (!Array.isArray(berberler) || berberler.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="4" class="empty-row">Kayıtlı berber bulunamadı.</td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = berberler.map(berber => `
                <tr data-id="${berber.id}">
                    <td>${berber.adSoyad}</td>
                    <td>${berber.uzmanlikAlani || '-'}</td>
                    <td><span class="badge approved">Aktif</span></td>
                    <td>
                        <button class="action-btn" style="font-size: 12px; margin-right: 5px;">Düzenle</button>
                        <button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">Sil</button>
                    </td>
                </tr>
            `).join('');

        } catch (error) {
            console.warn('Berber yönetimi listesi backendden alınamadı.', error);
        }
    }

    // =========================================================================
    // 5. BACKEND'DEN RANDEVU LİSTESİ ÇEKME
    // =========================================================================
    async function loadRandevular() {
        const tabloGosterge = document.getElementById('tabloGosterge');
        const tabloRandevular = document.getElementById('tabloRandevular');

        const aktifTablo = tabloRandevular || tabloGosterge;

        if (!aktifTablo || typeof api === 'undefined') {
            return;
        }

        try {
            const randevular = await api.randevulariGetir();
            const tbody = aktifTablo.querySelector('tbody');
            const kolonSayisi = aktifTablo.querySelectorAll('thead th').length || 7;

            if (!Array.isArray(randevular) || randevular.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="${kolonSayisi}" class="empty-row">Kayıtlı randevu bulunamadı.</td>
                    </tr>
                `;
                return;
            }

            tbody.innerHTML = randevular.map(randevu => {
                if (tabloRandevular) {
                    return `
                        <tr data-id="${randevu.id}">
                            <td>${randevu.tarih || '-'}</td>
                            <td>${randevu.saat || '-'}</td>
                            <td>${randevu.musteriTelefon || '-'}</td>
                            <td>-</td>
                            <td>${randevu.berberAdi || '-'}</td>
                            <td><span class="badge pending">Bekliyor</span></td>
                            <td>
                                <button class="action-btn" style="font-size: 12px; margin-right: 5px;">Onayla</button>
                                <button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">İptal</button>
                            </td>
                        </tr>
                    `;
                }

                return `
                    <tr data-id="${randevu.id}">
                        <td>${randevu.saat || '-'}</td>
                        <td>${randevu.musteriTelefon || '-'}</td>
                        <td>-</td>
                        <td>${randevu.berberAdi || '-'}</td>
                        <td><span class="badge pending">Bekliyor</span></td>
                        <td><button class="action-btn">Onayla</button></td>
                    </tr>
                `;
            }).join('');

        } catch (error) {
            console.warn('Randevular backendden alınamadı.', error);
        }
    }

    loadBerberYonetimi();
    loadRandevular();
});