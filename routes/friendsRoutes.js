import express from 'express';
const router = express.Router();
import friendsController from '../controllers/friendsController.js';  // default import

// Arkadaş Ekleme Endpoint'i (POST)
router.post('/add', friendsController.sendFriendRequest);

// Arkadaşlık İsteğini Kabul Etme Endpoint'i (POST)
router.post('/accept', friendsController.acceptFriendRequest);

// Arkadaş Listesini Görüntüleme Endpoint'i (GET)
router.get('/:userId', friendsController.getFriendsList);

// Arkadaş Silme Endpoint'i (DELETE)
router.delete('/remove', friendsController.removeFriend);

export default router;