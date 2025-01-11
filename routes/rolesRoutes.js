import express from 'express';
const router = express.Router();
import rolesController from '../controllers/rolesController.js'; // default import

// Rolleri Görüntüleme Endpoint'i (GET)
router.get('/', rolesController.getAllRoles);

// Rol Bazlı Tavsiye Ekleme Endpoint'i (POST)
router.post('/advice', rolesController.addRoleAdvice);

export default router;