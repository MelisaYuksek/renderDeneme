import flask
from flask import Flask, jsonify, render_template, request

# Modeli ve karmaşık veri işleme fonksiyonlarını yoruma alıyoruz
# import joblib
# from datetime import datetime
# import pandas as pd
# import numpy as np

# from your_feature_file import generate_features # Fonksiyonunuzun olduğu dosyayı import edebilirsiniz

app = Flask(__name__)

# Anasayfa (HTML'i gösterir)
@app.route('/')
def home():
    return render_template('index.html')

# --- SADECE TEST AMAÇLI YENİ ENDPOINT ---
@app.route('/calculate', methods=['GET'])
def calculate():
    """
    Basit bir hesaplama yapar ve sonucu JSON olarak döndürür.
    Frontend'den bu endpoint'e bir GET isteği gönderilerek test yapılır.
    """
    result = 2 + 2
    return jsonify({
        'sonuc': result,
        'mesaj': 'Flask sunucusu başarılı bir şekilde çalışıyor!'
    })

# Orijinal /predict endpoint'ini yoruma alıyoruz
# @app.route('/predict', methods=['POST'])
# def predict():
#    ... (eski kodunuz) ...

if __name__ == '__main__':
    app.run(debug=True)