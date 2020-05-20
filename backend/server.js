const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};
const expressWs = require('express-ws')(app);
app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
const db = require("./app/models");
// function createMessage(msg) {
//   return JSON.stringify(msg);
// }
var aWss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log("-----------------------")
    aWss.clients.forEach(function (client) {
      client.send(msg);
    });
  });
});
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/faculty.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

