const airports = [
  { code: "ADA", name: "Adana Şakirpaşa Havaalanı" },
  { code: "ADF", name: "Adıyaman Havaalanı" },
  { code: "AFY", name: "Afyon Havaalanı" },
  { code: "AJI", name: "Ağrı Havaalanı" },
  { code: "AYT", name: "Antalya Havaalanı" },
  { code: "MZH", name: "Amasya Merzifon Havaalanı" },
  { code: "BAL", name: "Batman Havaalanı" },
  { code: "BGG", name: "Bingöl Havaalanı" },
  { code: "BJV", name: "Milas–Bodrum Havaalanı" },
  { code: "BZI", name: "Balıkesir Merkez Havaalanı" },
  { code: "EDO", name: "Balıkesir Koca Seyit Havaalanı" },
  { code: "YEI", name: "Bursa Yenişehir Havaalanı" },
  { code: "CKZ", name: "Çanakkale Havaalanı" },
  { code: "DLM", name: "Dalaman Havaalanı" },
  { code: "DNZ", name: "Denizli Çardak Havaalanı" },
  { code: "DIY", name: "Diyarbakır Havaalanı" },
  { code: "EZS", name: "Elazığ Havaalanı" },
  { code: "ERC", name: "Erzincan Havaalanı" },
  { code: "ERZ", name: "Erzurum Havaalanı" },
  { code: "ESB", name: "Ankara Esenboğa Havaalanı" },
  { code: "AOE", name: "Eskişehir Hasan Polatkan Havaalanı" },
  { code: "GZP", name: "Gazipaşa Havaalanı" },
  { code: "GZT", name: "Gaziantep Havaalanı" },
  { code: "HTY", name: "Hatay Havaalanı" },
  { code: "IGD", name: "Iğdır Havaalanı" },
  { code: "IST", name: "İstanbul Havaalanı" },
  { code: "SAW", name: "İstanbul Sabiha Gökçen Havaalanı" },
  { code: "KCM", name: "Kahramanmaraş Havaalanı" },
  { code: "KSY", name: "Kars Harakani Havaalanı" },
  { code: "KCO", name: "Kocaeli Cengiz Topel Havaalanı" },
  { code: "KYA", name: "Konya Havaalanı" },
  { code: "MLX", name: "Malatya Erhaç Havaalanı" },
  { code: "MQM", name: "Mardin Havaalanı" },
  { code: "MSR", name: "Muş Havaalanı" },
  { code: "NAV", name: "Nevşehir Kapadokya Havaalanı" },
  { code: "NKT", name: "Şırnak Şerafettin Elçi Havaalanı" },
  { code: "SZF", name: "Samsun Çarşamba Havaalanı" },
  { code: "SXZ", name: "Siirt Havaalanı" },
  { code: "VAS", name: "Sivas Nuri Demirağ Havaalanı" },
  { code: "TEQ", name: "Tekirdağ Çorlu Havaalanı" },
  { code: "TJK", name: "Tokat Havaalanı" },
  { code: "TZX", name: "Trabzon Havaalanı" },
  { code: "VAN", name: "Van Ferit Melen Havaalanı" },
  { code: "ONQ", name: "Zonguldak Çaycuma Havaalanı" }
];

function setupAutocomplete(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionsId);

  function filterAirports(query) {
    const q = query.toLowerCase();
    return airports.filter(a =>
      a.code.toLowerCase().startsWith(q) ||
      a.name.toLowerCase().startsWith(q)
    );
  }

  function showSuggestions(filtered) {
    suggestions.innerHTML = "";
    if (filtered.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    filtered.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.code} - ${a.name}`;
      li.addEventListener("click", () => {
        input.value = `${a.code} - ${a.name}`;
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        input.dataset.valid = "true";
      });
      suggestions.appendChild(li);
    });

    suggestions.style.display = "block";
  }

  input.addEventListener("click", () => {
    input.removeAttribute("readonly");
    input.focus();
    showSuggestions(filterAirports(""));
  });

  input.addEventListener("focus", () => {
    showSuggestions(filterAirports(input.value));
  });

  input.addEventListener("input", () => {
    input.dataset.valid = "false";
    const filtered = filterAirports(input.value);
    showSuggestions(filtered);
  });

  input.addEventListener("blur", (e) => {
    setTimeout(() => {
      if (!input.dataset.valid || input.dataset.valid === "false") {
        input.setAttribute("readonly", "true");
      }
    }, 200);
  });

  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.style.display = "none";
      if (!input.dataset.valid || input.dataset.valid === "false") {
        input.setAttribute("readonly", "true");
      }
    }
  });
}

function setupSwapButton() {
  const swapBtn = document.getElementById('swap-btn');
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');

  swapBtn.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;

    // Valid durumlarını da değiştir
    const tempValid = fromInput.dataset.valid;
    fromInput.dataset.valid = toInput.dataset.valid;
    toInput.dataset.valid = tempValid;
  });
}

function setupDateTimePicker(inputId, pickerId, dateInputId, timeInputId, todayBtnId, cancelBtnId, confirmBtnId) {
  const datetimeInput = document.getElementById(inputId);
  const datetimePicker = document.getElementById(pickerId);
  const dateInput = document.getElementById(dateInputId);
  const timeInput = document.getElementById(timeInputId);
  const todayBtn = document.getElementById(todayBtnId);
  const cancelBtn = document.getElementById(cancelBtnId);
  const confirmBtn = document.getElementById(confirmBtnId);

  datetimeInput.addEventListener('click', () => {
    datetimePicker.classList.add('active');
  });

  todayBtn.addEventListener('click', () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);
    dateInput.value = dateStr;
    timeInput.value = timeStr;
  });

  cancelBtn.addEventListener('click', () => {
    datetimePicker.classList.remove('active');
  });

  confirmBtn.addEventListener('click', () => {
    if (dateInput.value && timeInput.value) {
      const dateObj = new Date(dateInput.value);
      const formattedDate = dateObj.toLocaleDateString('tr-TR');
      datetimeInput.value = `${formattedDate} - ${timeInput.value}`;
      datetimeInput.dataset.valid = "true";
      datetimePicker.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!datetimeInput.contains(e.target) && !datetimePicker.contains(e.target)) {
      datetimePicker.classList.remove('active');
    }
  });
}

function setupMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.header-nav');
  const overlay = document.querySelector('.mobile-overlay');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  overlay.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Risk skalası fonksiyonları
function updateRiskScale(riskScore) {
  const riskScale = document.getElementById('risk-scale');
  const scaleScore = document.getElementById('scale-score');
  const scaleLevel = document.getElementById('scale-level');
  const scaleDescription = document.getElementById('scale-description');
  const arrowIndicator = document.getElementById('arrow-indicator');
  
  // Skoru göster
  scaleScore.textContent = riskScore.toFixed(2);
  
  // Risk seviyesini belirle
  let level, description, levelClass;
  
  if (riskScore >= 0.98) {
    level = "Çok Yüksek Risk";
    description = "Çok yüksek olasılıkla uçuş iptali gerçekleşecek";
    levelClass = "level-very-high";
  } else if (riskScore >= 0.93) {
    level = "Yüksek Risk";
    description = "Yüksek olasılıkla uçuş iptali gerçekleşecek";
    levelClass = "level-high";
  } else if (riskScore >= 0.86) {
    level = "Düşük Risk";
    description = "Düşük olasılıkla uçuş iptali gerçekleşebilir";
    levelClass = "level-low";
  } else {
    level = "Normal Uçuş";
    description = "Uçuşunuzun iptal edilme riski çok düşük";
    levelClass = "level-normal";
  }
  
  // Seviye ve açıklamayı güncelle
  scaleLevel.textContent = level;
  scaleLevel.className = `scale-level ${levelClass}`;
  scaleDescription.textContent = description;
  
  // Ok pozisyonunu hesapla (0-100% arası)
  let arrowPosition;
  if (riskScore <= 0.86) {
    arrowPosition = (riskScore / 0.86) * 25; // 0-25% arası
  } else if (riskScore <= 0.93) {
    arrowPosition = 25 + ((riskScore - 0.86) / (0.93 - 0.86)) * 25; // 25-50% arası
  } else if (riskScore <= 0.98) {
    arrowPosition = 50 + ((riskScore - 0.93) / (0.98 - 0.93)) * 25; // 50-75% arası
  } else {
    arrowPosition = 75 + Math.min(((riskScore - 0.98) / 0.02) * 25, 25); // 75-100% arası
  }
  
  // Ok pozisyonunu ayarla
  arrowIndicator.style.left = `${Math.min(Math.max(arrowPosition, 0), 100)}%`;
  
  // Risk skalasını göster
  riskScale.classList.add('active');
}

// Sabit risk skoru üretme fonksiyonu (geliştirme aşaması için)
function generateRiskScore() {
  return 0.5; // Geliştirme aşaması için sabit değer
}

document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("from", "from-suggestions");
  setupAutocomplete("to", "to-suggestions");
  setupSwapButton();
  
  // Kalkış tarih-saat picker'ı
  setupDateTimePicker('departure-datetime', 'datetime-picker', 'date-input', 'time-input', 
    'today-btn', 'cancel-datetime', 'confirm-datetime');
    
  // Varış tarih-saat picker'ı
  setupDateTimePicker('arrival-datetime', 'arrival-datetime-picker', 'arrival-date-input', 
    'arrival-time-input', 'arrival-today-btn', 'arrival-cancel-datetime', 'arrival-confirm-datetime');
    
  setupMobileMenu();

  const form = document.getElementById("flight-form");
  const result = document.getElementById("result");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const datetimeInput = document.getElementById("departure-datetime");
    const arrivalInput = document.getElementById("arrival-datetime");

    // Temel validasyonlar
    if (!fromInput.value || !toInput.value) {
      result.textContent = "Lütfen kalkış ve varış havalimanlarını seçin.";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    if (fromInput.value === toInput.value) {
      result.textContent = "Kalkış ve varış havalimanları aynı olamaz!";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    if (!datetimeInput.value) {
      result.textContent = "Lütfen kalkış tarih ve saat seçin.";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    if (!arrivalInput.value) {
      result.textContent = "Lütfen varış tarih ve saat seçin.";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    // Kalkış tarih kontrolü
    const [dateStr, timeStr] = datetimeInput.value.split(' - ');
    const [day, month, year] = dateStr.split('.');
    const departureDate = new Date(`${year}-${month}-${day}T${timeStr}`);
    const now = new Date();

    if (departureDate < now) {
      result.textContent = "Geçmiş bir tarihe uçuş planlanamaz.";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    // Varış tarih kontrolü
    const [arrDateStr, arrTimeStr] = arrivalInput.value.split(' - ');
    const [arrDay, arrMonth, arrYear] = arrDateStr.split('.');
    const arrivalDate = new Date(`${arrYear}-${arrMonth}-${arrDay}T${arrTimeStr}`);

    if (arrivalDate <= departureDate) {
      result.textContent = "Varış tarihi kalkış tarihinden sonra olmalıdır.";
      result.style.color = "red";
      result.style.display = "block";
      return;
    }

    // Risk skorunu üret ve göster
    const riskScore = generateRiskScore();
    updateRiskScale(riskScore);
    
    // Başarı mesajını gizle
    result.style.display = "none";
  });




  /*************************************************SİLLL**************************************** */
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
});

