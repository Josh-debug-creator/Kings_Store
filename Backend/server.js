import app from './app.js'
import configVariables from './Config/config.js';


app.listen(configVariables.PORT, () => {
  console.log("Server started at" + configVariables.PORT);
})





