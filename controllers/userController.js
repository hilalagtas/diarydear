const userService = require('../services/userService');

// Kullanıcı Kaydı
exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Kullanıcı Girişi
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.json({ message: 'Login successful.', user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Kullanıcı Bilgilerini Güncelleme
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userService.updateUser(id, req.body);
        res.json({ message: 'User updated successfully.', updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
