# Node.js'un resmi imajını kullan
FROM node:20

# Konteyner içinde çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Bcrypt için gerekli platform bağımlılığını ekleyin
RUN apt-get update && apt-get install -y libssl-dev && rm -rf /var/lib/apt/lists/*


# Tüm proje dosyalarını çalışma dizinine kopyala
COPY . .

# Uygulama portunu aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"]
