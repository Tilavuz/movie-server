require('dotenv').config()
require("./helpers/shared");
const express = require("express");
const app = express();
const cors = require('cors')
const { connect } = require("./db/connect");
connect();
const cookieParser = require('cookie-parser');

// Middlewares
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

// Router
const router = require('./routers/root.router')
app.use('/api', router)



const { port } = require("./helpers/shared");
app.listen(port, () => {
  console.log(`server ${port}-portda ishga tushdi`);
});