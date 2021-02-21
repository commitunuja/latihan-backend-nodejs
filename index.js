require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use(require("./routes/config"));


const directory = path.join(__dirname, './files');
app.use('/files', express.static(directory));

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  // catch all
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: error.message,
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});