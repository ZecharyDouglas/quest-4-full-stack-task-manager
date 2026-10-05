import { describe, test, expect } from "vitest";
import request from "supertest";
import { app } from "../server/app.js";

describe("Quest 4B - Express API", () => {
  // CHECKPOINT 4B.1
  test("GET /tasks returns all tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test("GET /tasks/:id returns one task", async () => {
    const response = await request(app).get("/tasks/1");

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
  });

  test("GET /tasks/:id returns 404 when task does not exist", async () => {
    const response = await request(app).get("/tasks/999");

    expect(response.status).toBe(404);
  });

  // CHECKPOINT 4B.2
  test("POST /tasks creates a task and returns 201", async () => {
    const newTask = {
      id: 50,
      title: "Learn Express POST",
      priority: "high",
      completed: false,
    };

    const response = await request(app).post("/tasks").send(newTask);

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual(newTask);
  });

  test("POST /tasks rejects invalid task data with 400", async () => {
    const invalidTask = {
      id: 51,
      priority: "high",
      completed: false,
    };

    const response = await request(app).post("/tasks").send(invalidTask);

    expect(response.status).toBe(400);
  });

  // CHECKPOINT 4B.3
  test("PATCH /tasks/:id updates an existing task", async () => {
    const response = await request(app).patch("/tasks/1").send({
      title: "Updated task title",
      completed: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.title).toBe("Updated task title");
    expect(response.body.data.completed).toBe(true);
  });

  test("PATCH /tasks/:id can update completed to false", async () => {
    const response = await request(app).patch("/tasks/1").send({
      completed: false,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.completed).toBe(false);
  });

  test("PATCH /tasks/:id returns 404 for an unknown task", async () => {
    const response = await request(app).patch("/tasks/999").send({
      title: "Ghost task",
    });

    expect(response.status).toBe(404);
  });

  // CHECKPOINT 4B.4
  test.todo("DELETE /tasks/:id removes an existing task", async () => {
    // Create our own task so this test doesn't destroy starter data.
    await request(app).post("/tasks").send({
      id: 99,
      title: "Delete me",
      priority: "low",
      completed: false,
    });

    const response = await request(app).delete("/tasks/99");

    expect(response.status).toBe(200);

    const lookupResponse = await request(app).get("/tasks/99");

    expect(lookupResponse.status).toBe(404);
  });

  test.todo("DELETE /tasks/:id returns 404 for an unknown task", async () => {
    const response = await request(app).delete("/tasks/999");

    expect(response.status).toBe(404);
  });
});
