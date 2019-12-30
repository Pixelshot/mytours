const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// param middleware has a fourth argument = value(val)
// must always call next() on a middleware or else code will get stuck
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

// ================================= Get Tour List =======================================
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
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
  const tour = tours.find(el => el.id === id);

  res.status(200).json({
    status: 'sucess',
    data: {
      tour
    }
  });
};
// =======================================================================================
// ================================= Post New Tour List ==================================
exports.createTour = (req, res) => {
  // Normally creation of an ID is handled via server-side but since a db has not been implemented, we're doing it here via client-side.
  const newId = tours[tours.length - 1].id + 1;

  // Object.assign combines two objects into one
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  // Save new tour in our data
  // Since our callback function will run through the event-loop, we'll use writeFile to prevent code block
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
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
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(204).json({
      status: 'successfully deleted',
      data: null
    });
  }
};
