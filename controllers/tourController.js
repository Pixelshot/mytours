const Tour = require('./../models/tourModel');

// ================================= Get Tour List =======================================
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};
// =======================================================================================
// ================================= Get Single List =====================================
exports.getTour = (req, res) => {
  console.log(req.params);
  // variables we get from :id is stored in params

  // Since id has been stringified, we can convert it back to integer by muiltiplying like below
  // "string" * integer = integer
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  // res.status(200).json({
  //   status: 'sucess',
  //   data: {
  //     tour
  //   }
  // });
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
      message: 'Invalid data sent!'
    });
  }
};
// ========================================================================================
// ================================= Patch Tour List ======================================
// Since we're gonna use mongoose for mongoDB for the real CRUD, we're just gonna insert a placehloder for patch
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: 'Updated tour right here'
    }
  });
};
// =======================================================================================
// ================================ Delete Tour List =====================================
// Since we're gonna use mongoose for mongoDB for the real CRUD, we're just gonna insert a placehloder for patch
exports.deleteTour = (req, res) => {
  return res.status(204).json({
    status: 'successfully deleted',
    data: null
  });
};
