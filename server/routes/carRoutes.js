const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController.js');

router.get('/', carController.getCars);
router.post('/', carController.createCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);

module.exports = router;