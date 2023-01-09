//WaKlDUIHR5Ll6haW
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unKnown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://fill:54OviozHhAzZxYJ4@cluster0.qamginl.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("เชื่อมต่อเรียบร้อย");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
