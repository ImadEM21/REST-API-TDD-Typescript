import { Express, response } from "express";
import request from "supertest";
const app: Express = require("./app");

describe("Todos", () => {
  it("GET /todos --> should return array of todos", () => {
    return request(app)
      .get("/todos")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              completed: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  it("GET /todos/id --> should return todo with ID", () => {
    return request(app)
      .get("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: expect.any(Boolean),
          })
        );
      });
  });

  it("GET /todos/id --> should return 404 if not found", () => {
    return request(app).get("/todos/999").expect(404);
  });

  it("POST /todos --> should return the created todo", () => {
    return request(app)
      .post("/todos")
      .send({ name: "Learn TDD" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: "Learn TDD",
            completed: false,
          })
        );
      });
  });

  it("PUT /todos/id --> should return the updated todo", () => {
    return request(app)
      .put("/todos/1")
      .send({ completed: true })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            completed: true,
          })
        );
      });
  });

  it("PUT /todos/id --> should return 404 if not found", () => {
    return request(app)
      .put("/todos/9993")
      .send({ completed: true })
      .expect(404);
  });

  it("DELETE --> should return message that indicates that the todo has been deleted", () => {
    return request(app)
      .delete("/todos/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Todo has been deleted successfully",
          })
        );
      });
  });
});
