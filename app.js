const fs = require('fs');
const express = require('express');

const app = express();

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
