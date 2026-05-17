
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


function randevuyuOnayla() {
    const selectedService = document.querySelector('.service-card.selected');
    const selectedBarber = document.querySelector('.barber-card.selected');
    const selectedTime = document.querySelector('.time-box.selected');

    const dateInput = document.getElementById('appointment-date');
    const nameInput = document.getElementById('customer-name');
    const phoneInput = document.getElementById('customer-phone');
    const noteInput = document.getElementById('customer-note');

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


    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    savedAppointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(savedAppointments));

    showAppointmentResult(appointment);
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


document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('appointment-date');

    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
});