const express = require('express');
const tourController = require('./../controllers/tourController');

// it's considered as a convention to call it router
const router = express.Router();

router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if a body contains the name and price property
// If not, send back 400(bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
