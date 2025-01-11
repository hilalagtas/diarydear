import rolesService from '../services/rolesService.js';

// Rolleri Görüntüleme
const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesService.getAllRoles();
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Rol Bazlı Tavsiye Ekleme
const addRoleAdvice = async (req, res) => {
    try {
        const { roleId, advice } = req.body;

        if (!roleId || !advice) {
            return res.status(400).json({ error: 'Both roleId and advice are required.' });
        }

        const updatedRole = await rolesService.addRoleAdvice(roleId, advice);
        return res.status(200).json({ message: 'Advice added successfully.', updatedRole });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Fonksiyonları dışa aktarıyoruz
export default { getAllRoles, addRoleAdvice };