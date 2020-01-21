const Tour = require('./../models/tourModel');

// ================================= Get Tour List =======================================
exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // Things we want to remove from querying
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Normal way of querying
    const query = Tour.find(queryObj);

    // // Mongoose way of querying
    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
// =======================================================================================
// ================================= Get Single List =====================================
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id }) - Works the same as Tour.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
// =======================================================================================
// ================================= Post New Tour List ==================================
exports.createTour = async (req, res) => {
  try {
    // ------- Previous way of creating --------
    // const newTour = new Tour({})
    // newTour.save()
    // -------------------------------------------

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err
    });
  }
};
// ========================================================================================
// ================================= Patch Tour List ======================================
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to ensure the updated data always return
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
// =======================================================================================
// ================================ Delete Tour List =====================================
exports.deleteTour = async (req, res) => {
  try {
    // Character.deleteOne({ name: 'Eddard Stark' }, function (err) {});
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'successfully deleted',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};
