function selectService(clickedElement) {
    const services = document.querySelectorAll('.service-card');

    services.forEach(service => {
        service.classList.remove('selected');

        const checkCircle = service.querySelector('.check-circle');
        if (checkCircle) {
            checkCircle.innerText = '';
        }
    });

    clickedElement.classList.add('selected');

    const selectedCheckCircle = clickedElement.querySelector('.check-circle');
    if (selectedCheckCircle) {
        selectedCheckCircle.innerText = '✓';
    }

    const price = clickedElement.dataset.price || '0';
    updateTotalPrice(price);
    clearAppointmentResult();
}

function selectBarber(clickedElement) {
    const barbers = document.querySelectorAll('.barber-card');

    barbers.forEach(barber => {
        barber.classList.remove('selected');
    });

    clickedElement.classList.add('selected');
    clearAppointmentResult();
}

function selectTime(clickedElement) {
    if (clickedElement.classList.contains('booked')) {
        return;
    }

    const times = document.querySelectorAll('.time-box');

    times.forEach(time => {
        time.classList.remove('selected');
    });

    clickedElement.classList.add('selected');
    clearAppointmentResult();
}

function updateTotalPrice(price) {
    const totalPriceElement = document.getElementById('total-price');

    if (totalPriceElement) {
        totalPriceElement.innerText = `₺${price},00`;
    }
}

function clearAppointmentResult() {
    const resultBox = document.getElementById('appointment-result');

    if (resultBox) {
        resultBox.innerHTML = '';
        resultBox.classList.remove('show');
    }
}

function validateAppointmentForm(appointment) {
    if (!appointment.service) {
        alert('Lütfen bir hizmet seçiniz.');
        return false;
    }

    if (!appointment.barber) {
        alert('Lütfen bir berber seçiniz.');
        return false;
    }

    if (!appointment.date) {
        alert('Lütfen randevu tarihi seçiniz.');
        return false;
    }

    if (!appointment.time) {
        alert('Lütfen uygun bir saat seçiniz.');
        return false;
    }

    if (!appointment.customerName) {
        alert('Lütfen ad soyad bilginizi giriniz.');
        return false;
    }

    if (!appointment.phone) {
        alert('Lütfen telefon numaranızı giriniz.');
        return false;
    }

    if (appointment.phone.length < 10) {
        alert('Telefon numarası eksik görünüyor.');
        return false;
    }

    return true;
}

async function randevuyuOnayla() {
    const selectedService = document.querySelector('.service-card.selected');
    const selectedBarber = document.querySelector('.barber-card.selected');
    const selectedTime = document.querySelector('.time-box.selected');

    const dateInput = document.getElementById('appointment-date');
    const nameInput = document.getElementById('customer-name');
    const phoneInput = document.getElementById('customer-phone');
    const noteInput = document.getElementById('customer-note');
    const submitButton = document.querySelector('.submit-btn');

    const appointment = {
        service: selectedService ? selectedService.dataset.service : '',
        barber: selectedBarber ? selectedBarber.dataset.barber : '',
        date: dateInput ? dateInput.value : '',
        time: selectedTime ? selectedTime.innerText : '',
        customerName: nameInput ? nameInput.value.trim() : '',
        phone: phoneInput ? phoneInput.value.trim() : '',
        note: noteInput ? noteInput.value.trim() : '',
        price: selectedService ? selectedService.dataset.price : '0'
    };

    const isValid = validateAppointmentForm(appointment);

    if (!isValid) {
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = 'KAYDEDİLİYOR...';
    }

    try {
        /*
            Önce eski frontend mantığını koruyoruz.
            Backend çalışmasa bile randevu oluşturma butonu bozulmayacak.
        */
        const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        savedAppointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(savedAppointments));

        /*
            Backend varsa ayrıca backend'e göndermeyi deniyoruz.
            api.js yoksa ya da backend kapalıysa buton bozulmaz.
        */
        if (typeof api !== 'undefined') {
            try {
                await api.musteriKayit({
                    adSoyad: appointment.customerName,
                    telefon: appointment.phone,
                    sifre: appointment.phone.slice(-4) || '1234'
                });

                const savedRandevu = await api.randevuAl({
                    musteriTelefon: appointment.phone,
                    berberAdi: appointment.barber,
                    tarih: appointment.date,
                    saat: appointment.time
                });

                appointment.backendId = savedRandevu ? savedRandevu.id : null;

            } catch (backendError) {
                console.warn('Backend bağlantısı başarısız. Randevu sadece frontend tarafında kaydedildi.', backendError);
            }
        }

        showAppointmentResult(appointment);

    } catch (error) {
        console.error('Randevu oluşturulurken hata oluştu:', error);
        showAppointmentError('Randevu oluşturulurken beklenmeyen bir hata oluştu.');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerText = 'RANDEVUYU ONAYLA';
        }
    }
}

function showAppointmentResult(appointment) {
    const resultBox = document.getElementById('appointment-result');

    if (!resultBox) {
        return;
    }

    resultBox.classList.add('show');

    resultBox.innerHTML = `
        <h3>Randevunuz Oluşturuldu</h3>
        <p><strong>Ad Soyad:</strong> ${appointment.customerName}</p>
        <p><strong>Telefon:</strong> ${appointment.phone}</p>
        <p><strong>Hizmet:</strong> ${appointment.service}</p>
        <p><strong>Berber:</strong> ${appointment.barber}</p>
        <p><strong>Tarih:</strong> ${formatDate(appointment.date)}</p>
        <p><strong>Saat:</strong> ${appointment.time}</p>
        <p><strong>Toplam Tutar:</strong> ₺${appointment.price},00</p>
        ${appointment.note ? `<p><strong>Not:</strong> ${appointment.note}</p>` : ''}
    `;
}

function showAppointmentError(message) {
    const resultBox = document.getElementById('appointment-result');

    if (!resultBox) {
        alert(message);
        return;
    }

    resultBox.classList.add('show');

    resultBox.innerHTML = `
        <h3 style="color: #e74c3c;">Hata</h3>
        <p>${message}</p>
    `;
}

function formatDate(dateValue) {
    if (!dateValue) {
        return '';
    }

    const date = new Date(dateValue + 'T00:00:00');

    return date.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long'
    });
}

async function loadBerbersFromBackend() {
    const barberContainer = document.getElementById('barber-container');

    if (!barberContainer || typeof api === 'undefined') {
        return;
    }

    try {
        const berberler = await api.berberleriGetir();

        if (!Array.isArray(berberler) || berberler.length === 0) {
            return;
        }

        barberContainer.innerHTML = berberler.map((berber, index) => `
            <div 
                class="barber-card ${index === 0 ? 'selected' : ''}" 
                data-barber="${berber.adSoyad}" 
                onclick="selectBarber(this)"
            >
                <div class="icon">✂</div>
                <h4>${berber.adSoyad}</h4>
                <p>${berber.uzmanlikAlani || 'Berber'}</p>
            </div>
        `).join('');

    } catch (error) {
        console.warn('Berber listesi backendden alınamadı. Varsayılan HTML listesi kullanılacak.', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('appointment-date');

    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    loadBerbersFromBackend();
});