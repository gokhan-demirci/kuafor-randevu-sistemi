// 1. Hizmet Seçimi ve Fiyat Güncelleme
function selectService(clickedElement) {
    // Tüm hizmetlerden 'selected' sınıfını kaldır
    let services = document.querySelectorAll('.service-card');
    services.forEach(service => {
        service.classList.remove('selected');
        // Tik işaretini gizle
        service.querySelector('.check-circle').innerText = ''; 
    });

    // Tıklanana ekle
    clickedElement.classList.add('selected');
    clickedElement.querySelector('.check-circle').innerText = '✓';

    // Fiyatı al ve aşağıyı güncelle
    let price = clickedElement.getAttribute('data-price');
    document.getElementById('total-price').innerText = '₺' + price + ',00';
}

// 2. Berber Seçimi
function selectBarber(clickedElement) {
    let barbers = document.querySelectorAll('.barber-card');
    barbers.forEach(barber => barber.classList.remove('selected'));
    
    clickedElement.classList.add('selected');
}

// 3. Saat Seçimi (Kural: Dolu olanlara tıklanamaz)
function selectTime(clickedElement) {
    // Eğer saat dolu (booked) sınıfına sahipse hiçbir işlem yapma
    if(clickedElement.classList.contains('booked')) {
        return; 
    }

    // Tüm müsait saatlerden 'selected' sınıfını kaldır
    let times = document.querySelectorAll('.time-box');
    times.forEach(time => {
        time.classList.remove('selected');
    });

    // Tıklanana ekle
    clickedElement.classList.add('selected');
}

// 4. Randevuyu Onaylama ve Backend'e (API) gönderme hazırlığı
function randevuyuOnayla() {
    // Seçili saat var mı diye kontrol edelim
    let selectedTime = document.querySelector('.time-box.selected');
    
    if(!selectedTime) {
        alert("Lütfen devam etmek için uygun bir saat seçiniz.");
        return;
    }

    // Backend (Spring Boot) ekibinin oluşturacağı API'ye gidecek veriler hazır
    alert("Kayıt başarılı! Seçtiğiniz saat: " + selectedTime.innerText + "\n\nŞimdi bu verileri Spring Boot tarafına POST ile göndereceğiz.");
}