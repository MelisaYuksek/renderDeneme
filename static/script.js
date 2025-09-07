document.addEventListener("DOMContentLoaded", function() {
    // Flask sunucusundaki /calculate endpoint'ine istek gönder
    fetch('/calculate')
        .then(response => {
            // Yanıtın başarılı olup olmadığını kontrol et
            if (!response.ok) {
                throw new Error('Sunucuya bağlanırken bir hata oluştu.');
            }
            return response.json();
        })
        .then(data => {
            // Yanıt olarak gelen JSON verisini al
            const testResultElement = document.getElementById('test-result');
            testResultElement.style.display = 'block'; // Elementi görünür yap
            testResultElement.textContent = `API Testi Başarılı: 2 + 2 = ${data.sonuc}! ${data.mesaj}`;
            console.log("Sunucudan gelen veri:", data);
        })
        .catch(error => {
            // Hata olursa kullanıcıya bilgi ver
            const testResultElement = document.getElementById('test-result');
            testResultElement.style.display = 'block';
            testResultElement.textContent = `Hata: ${error.message}`;
            testResultElement.style.color = 'red';
            console.error('Test sırasında hata oluştu:', error);
        });
});