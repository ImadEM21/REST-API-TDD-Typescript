import express, { Express, Request, Response, Router } from "express";
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

const todosRouter: Router = require('./routes/todos');

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use('/todos', todosRouter);

module.exports = app;
