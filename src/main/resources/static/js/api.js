const API_BASE_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8080'
        : window.location.origin;

async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `İstek başarısız: ${response.status}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

const api = {
    berberleriGetir() {
        return apiRequest('/api/berber/liste');
    },

    berberEkle(berber) {
        return apiRequest('/api/berber/ekle', {
            method: 'POST',
            body: JSON.stringify(berber)
        });
    },

    musteriKayit(musteri) {
        return apiRequest('/api/musteri/kayit', {
            method: 'POST',
            body: JSON.stringify(musteri)
        });
    },

    randevuAl(randevu) {
        return apiRequest('/api/randevu/al', {
            method: 'POST',
            body: JSON.stringify(randevu)
        });
    },

    randevulariGetir() {
        return apiRequest('/api/randevu/liste');
    }
};