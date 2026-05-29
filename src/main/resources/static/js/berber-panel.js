document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const secilenBerber = params.get('berber') || 'Mert Alkan';

    const baslik = document.getElementById('berberBaslik');
    const tarihAlani = document.getElementById('bugununTarihi');
    const bugunkuRandevuSayisi = document.getElementById('bugunkuRandevuSayisi');
    const gunlukKazanc = document.getElementById('gunlukKazanc');
    const tabloBody = document.querySelector('#tabloRandevular tbody');

    const bugun = new Date();
    const bugunIso = bugun.toISOString().split('T')[0];

    if (baslik) {
        baslik.innerText = `Hoş Geldin, ${secilenBerber}`;
    }

    if (tarihAlani) {
        tarihAlani.innerText = bugun.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            weekday: 'long'
        });
    }

    if (!tabloBody) {
        return;
    }

    if (typeof api === 'undefined') {
        tabloBody.innerHTML = `
            <tr>
                <td colspan="5" style="color: var(--text-muted); text-align: center;">
                    api.js yüklenmedi.
                </td>
            </tr>
        `;
        return;
    }

    try {
        const randevular = await api.randevulariGetir();

        const berberRandevulari = randevular.filter(randevu => {
            return randevu.berberAdi === secilenBerber;
        });

        const bugunkuRandevular = berberRandevulari.filter(randevu => {
            return randevu.tarih === bugunIso;
        });

        if (bugunkuRandevuSayisi) {
            bugunkuRandevuSayisi.innerText = bugunkuRandevular.length;
        }

        if (gunlukKazanc) {
            const tahminiKazanc = bugunkuRandevular.length * 500;
            gunlukKazanc.innerText = `₺${tahminiKazanc.toLocaleString('tr-TR')}`;
        }

        if (berberRandevulari.length === 0) {
            tabloBody.innerHTML = `
                <tr>
                    <td colspan="5" style="color: var(--text-muted); text-align: center;">
                        Bu berbere ait randevu bulunamadı.
                    </td>
                </tr>
            `;
            return;
        }

        tabloBody.innerHTML = berberRandevulari.map(randevu => `
            <tr data-id="${randevu.id}">
                <td>${randevu.saat || '-'}</td>
                <td>${randevu.musteriTelefon || '-'}</td>
                <td>${formatDate(randevu.tarih) || '-'}</td>
                <td><span class="badge pending">Bekliyor</span></td>
                <td>
                    <button class="action-btn" style="font-size: 12px; margin-right: 5px;">Onayla</button>
                    <button class="action-btn" style="font-size: 12px; color: #e74c3c; border-color: #e74c3c;">İptal</button>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Berber randevuları alınamadı:', error);

        tabloBody.innerHTML = `
            <tr>
                <td colspan="5" style="color: var(--text-muted); text-align: center;">
                    Randevular backend'den alınamadı.
                </td>
            </tr>
        `;
    }
});

function formatDate(dateValue) {
    if (!dateValue) {
        return '';
    }

    const date = new Date(dateValue + 'T00:00:00');

    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}