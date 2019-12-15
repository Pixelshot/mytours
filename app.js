const fs = require('fs');
const express = require('express');

const app = express();

// middleware function that can modify incoming request data
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
});

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

// =================================================================================
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server side!', app: 'Mytours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint..😼');
// });
// =================================================================================

// PORT
const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
