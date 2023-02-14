const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const authRouter = require("./routes/user");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
//extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const authenticateUser = require("./middlewares/auth");
const notFoundMiddleware = require("./middlewares/page-not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

app.set('trust proxy' , 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Task Manger api");
});

//routes

app.use("/api/v1/tasks", tasks);
app.use("/api/v1/auth", authRouter);


// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

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
