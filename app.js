// app.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import conn from './db.js';  // Default export kullanıldığı için böyle import ediyorsunuz

dotenv.config();

// Veritabanı bağlantısı
conn();



const app = express();
const port = 3000;

// Middleware, JSON verilerini işlemek için
app.use(bodyParser.json());

// Ana sayfa (GET /) route'u
app.get('/', (req, res) => {
    res.send('Hoşgeldiniz! Kayıt için /register endpoint\'ini kullanabilirsiniz.');
});

// Kayıt olma (register) endpoint'i
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required!" });
    }

    // Burada veritabanına kaydetme işlemi yapılabilir
    res.status(201).json({
        message: 'User registered successfully!',
        user: {
            username,
            password, // Gerçek projede şifreyi asla düz metin olarak kaydetmeyin!
        }
    });
});

// Sunucuyu başlatma
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
