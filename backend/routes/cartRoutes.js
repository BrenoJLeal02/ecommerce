const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);


router.delete('/remove/:userId/:productId', cartController.removeItemFromCart);


router.get('/:userId', cartController.getCartItems);
router.put('/update-quantity', cartController.updateItemQuantity);

module.exports = router;
