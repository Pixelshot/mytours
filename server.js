const dotenv = require('dotenv');
const app = require('./app');

// dotenv configuration
dotenv.config({ path: './config.env' });

// =======================================================================================
//                                       PORT
// =======================================================================================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
