import express, { Express, Request, Response } from "express";
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

module.exports = app;
