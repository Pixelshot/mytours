const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// third party middlewares function that can modify incoming request data
app.use(morgan('dev'));
app.use(express.json());

// own middleware function
app.use((req, res, next) => {
  console.log('Hello from middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// =======================================================================================
//                                     TOUR CRUD
// =======================================================================================

// ================================= Get Tour List =======================================
const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
  console.log(req.params);
  // variables we get from :id is stored in params

  // Since id has been stringified, we can convert it back to integer by muiltiplying like below
  // "string" * integer = integer
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // Create an error message if id is not found
  // Checking via length: ```if (id > tours.length)``` works as well
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      tour
    }
  });
};
// =======================================================================================
// ================================= Post New Tour List ==================================
const createTour = (req, res) => {
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
const updateTour = (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Gator never been about that 🐊'
    });
  }

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
const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(204).json({
      status: 'successfully deleted',
      data: null
    });
  }
};

// ========================================================================================
//                                     USER CRUD
// ========================================================================================

// ================================= Get Users List =======================================
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!'
  });
};
// ========================================================================================
// ================================= Get Single List ======================================
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!'
  });
};
// ========================================================================================
// ================================= Post New User List ===================================
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!'
  });
};

// ========================================================================================
// ================================= Patch User List ======================================
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!'
  });
};
// ========================================================================================
// ================================= Delete User List =====================================
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!'
  });
};
// ========================================================================================
//                                      ROUTES
// ========================================================================================
// === === === === Tour === === === === ===
// With id
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//Without id
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

// === === === === User === === === === ===
// With id
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// Without id
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);

// =======================================================================================
//                                       PORT
// =======================================================================================
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
// =======================================================================================
//                                  Original Routes
// =======================================================================================
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
