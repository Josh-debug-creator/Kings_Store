import app from './app.js'
// const app = require('./app')
// const configVariables = require ("./Config/config");
import configVariables from './Config/config.js';


app.listen(configVariables.PORT, () => {
  console.log("Server started at" + configVariables.PORT);
});





