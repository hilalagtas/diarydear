import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import conn from './db.js';  
import userRoutes from './routes/userRoutes.js';  // Kullanıcı rotaları
import friendsRoutes from './routes/friendsRoutes.js';  

dotenv.config();

// Veritabanı bağlantısı
conn();

const app = express();
const port = 3000;

// Middleware, JSON verilerini işlemek için
app.use(bodyParser.json());

// Kullanıcı rotalarını '/users' ile kullanma
app.use('/users', userRoutes);

// Arkadaş rotalarını '/friends' ile kullanma
app.use('/friends', friendsRoutes);

// Ana sayfa (GET /) route'u
app.get('/', (req, res) => {
    res.send('Hoşgeldiniz! Kayıt için /users/register, arkadaş eklemek için /friends/add endpoint\'ini kullanabilirsiniz.');
});

// POST isteği ile kullanıcı kaydı yapılacak
app.post('/hilal', (req, res) => {
    res.send('POST isteği gönderildi! Kayıt işlemi burada yapılabilir.');
});

// Sunucuyu başlatma
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
