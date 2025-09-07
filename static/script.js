document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById('submit-btn');
    const testResultElement = document.getElementById('test-result');

    submitButton.addEventListener('click', function(e) {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        // Butona tıklandığında Flask sunucusundaki /calculate endpoint'ine istek gönder
        fetch('/calculate')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sunucuya bağlanırken bir hata oluştu.');
                }
                return response.json();
            })
            .then(data => {
                // Gelen JSON verisini al ve sonuç paragrafını güncelle
                testResultElement.style.display = 'block';
                testResultElement.textContent = `API Testi Başarılı: 2 + 2 = ${data.sonuc}! ${data.mesaj}`;
                testResultElement.style.color = 'green';
                console.log("Sunucudan gelen veri:", data);
            })
            .catch(error => {
                // Hata olursa kullanıcıya bilgi ver
                testResultElement.style.display = 'block';
                testResultElement.textContent = `Hata: ${error.message}`;
                testResultElement.style.color = 'red';
                console.error('Test sırasında hata oluştu:', error);
            });
    });
});