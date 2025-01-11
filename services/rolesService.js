import Role from '../models/rolesModel.js';

// Rolleri Görüntüleme Servisi
const getAllRoles = async () => {
    const roles = await Role.find(); // Tüm rolleri döndürür
    return roles;
};

// Rol Bazlı Tavsiye Ekleme Servisi
const addRoleAdvice = async (roleId, advice) => {
    const role = await Role.findById(roleId);
    if (!role) throw new Error('Role not found.');

    // Tavsiye ekleme
    if (!role.advice) {
        role.advice = [];
    }
    role.advice.push(advice);

    await role.save();
    return role;
};

// Tüm fonksiyonları tek bir nesne olarak dışa aktar
export default {
    getAllRoles,
    addRoleAdvice,
};