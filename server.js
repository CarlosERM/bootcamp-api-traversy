const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const colors = require("colors");

//Load env files/
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();
//Body parser
app.use(express.json());

// Dev loggin middleware
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`
      .yellow.bold
  )
);

// Handle unhandle rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message})`.red);
  server.close(() => process.exitCode(1));
});
