const express = require('express');
const userController = require('../controllers/userController');
// it's considered as a convention to call it router
const router = express.Router();

// Without id
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// With id
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
