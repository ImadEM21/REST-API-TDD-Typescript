import express, { IRouter } from "express";
const router: IRouter = express.Router();
const controller = require("../controllers/todos");

router.get("/", controller.getTodos);
router.get("/:id", controller.getTodo);
router.post('/', controller.createTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
