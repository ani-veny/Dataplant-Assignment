const express = require("express");
const httpStatus = require("http-status");
const routes = require("./routes/schedule.route.js");
const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

console.log("This is from App.js schedules Routes");

app.use("/schedules", routes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = httpStatus.NOT_FOUND;
    next(error);
});

module.exports = app