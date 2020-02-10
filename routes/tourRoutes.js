const express = require('express');
const tourController = require('./../controllers/tourController');

// it's considered as a convention to call it router
const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
// Create a checkBody middleware
// Check if a body contains the name and price property
// If not, send back 400(bad request)
// Add it to the post handler stack

// Aggregation Pipeline
router.route('/tour-stats').get(tourController.getTourStats);

// Creating a monthly plan to find out which month is the busiest for the company
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
