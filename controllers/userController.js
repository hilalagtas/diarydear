import userService from '../services/userService.js';

// Kullanıcı Kaydı
const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        return res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Kullanıcı Girişi
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        return res.json({ message: 'Login successful.', user, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Kullanıcı Bilgilerini Güncelleme
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        return res.json({ message: 'User updated successfully.', updatedUser });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Kullanıcı Arama (Kullanıcı adına göre arama)
const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;  // URL'den query parametre olarak kullanıcı adı al
        if (!username) {
            return res.status(400).json({ error: 'Username parameter is required.' });
        }

        const users = await userService.searchUsersByUsername(username);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fonksiyonları dışa aktarıyoruz
export default { registerUser, loginUser, updateUser, searchUsers };
