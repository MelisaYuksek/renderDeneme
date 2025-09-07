document.addEventListener("DOMContentLoaded", () => {
    // Sadece bir test yapmak için, sayfa yüklendiğinde otomatik olarak çalışır
    fetch('/calculate') // Flask'teki '/calculate' endpoint'ine istek gönder
        .then(response => response.json())
        .then(data => {
            // Gelen JSON verisini işleyip HTML sayfasında göster
            const resultElement = document.getElementById('result-text'); // HTML'inizde uygun bir id'ye sahip element olmalı
            resultElement.textContent = `Hesaplama sonucu: ${data.sonuc}. Mesaj: ${data.mesaj}`;
            resultElement.style.display = "block"; // Eğer gizliyse göster
            console.log("Sunucudan gelen veri:", data);
        })
        .catch(error => {
            console.error('Test sırasında hata oluştu:', error);
            const resultElement = document.getElementById('result-text');
            resultElement.textContent = "Sunucuya bağlanırken bir hata oluştu.";
            resultElement.style.color = "red";
            resultElement.style.display = "block";
        });
});

// Diğer tüm fonksiyonları (örneğin updateRiskScale) yoruma alabilirsiniz.
// Bu test için sadece yukarıdaki kod yeterlidir.