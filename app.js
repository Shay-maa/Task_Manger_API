const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middlewares/page-not-found");
const errorHandlerMeddileware = require("./middlewares/error-handler");
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMeddileware)

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(`look for error ${error}`);
  }
};
start();
