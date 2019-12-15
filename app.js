const fs = require('fs');
const express = require('express');

const app = express();

// middleware function that can modify incoming request data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// =======================================================================================
//                                         CRUD
// =======================================================================================

// ================================= Get Tour List =======================================
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

// ================================= Get Single List =======================================
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  // variables we get from :id is stored in params

  // Since id has been stringified, we can convert it back to integer by muiltiplying like below
  // "string" * integer = integer
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // Create an error message if id is not found
  // Checking via length: ```if (id > tours.length)``` works as well
  if (!tour) {
    res.status(404).json({
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
});

//================================= Post New Tour List ====================================
app.post('/api/v1/tours', (req, res) => {
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
});

// ======================================= PORT ==========================================
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// =================================================================================
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server side!', app: 'Mytours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint..😼');
// });
// =================================================================================
