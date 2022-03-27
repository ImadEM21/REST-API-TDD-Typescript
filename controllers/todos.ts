import { Request, Response, NextFunction } from "express";
const createError = require("http-errors");

interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

const todos = [
  {
    id: 1,
    name: "Do wishes",
    completed: false,
  },
  {
    id: 2,
    name: "Finish MMIE",
    completed: false,
  },
  {
    id: 3,
    name: "Start new project",
    completed: false,
  },
];

exports.getTodos = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json(todos);
};

exports.getTodo = (req: Request, res: Response, next: NextFunction) => {
  const todo: Todo | undefined = todos.find(
    (todo) => todo.id === parseInt(req.params.id)
  );

  if (!todo) {
    return next(createError(404, "Todo not found"));
  }

  return res.status(200).json(todo);
};

exports.createTodo = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    return next(createError(422, "Name is invalid"));
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    name: req.body.name,
    completed: false,
  };
  todos.push(newTodo);

  return res.status(201).json(newTodo);
};

exports.updateTodo = (req: Request, res: Response, next: NextFunction) => {
  const todo: Todo | undefined = todos.find(
    (todo) => todo.id === parseInt(req.params.id)
  );

  if (!todo) {
    return next(createError(404, "Todo not found"));
  }

  const newTodo: Todo = {
    ...todo,
    ...req.body,
  };

  todos.filter((todo) => todo.id !== newTodo.id);
  todos.push(newTodo);
  return res.status(200).json(newTodo);
};

exports.deleteTodo = (req: Request, res: Response, next: NextFunction) => {
  todos.filter((todo) => todo.id !== parseInt(req.params.id));
  return res
    .status(200)
    .json({ message: "Todo has been deleted successfully" });
};
