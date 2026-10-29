import express from "express";
import cors from "cors";
import { starterTasks } from "./data.js";

export const app = express();
const cors_config = {
  origin: "http://localhost:5173",
};
app.use(cors(cors_config));
///
app.use(express.json());

app.get("/tasks", (req, res) => {
  res.status(200).json({
    data: starterTasks,
  });
});

app.get("/tasks/:id", (req, res) => {
  const task_id = Number(req.params.id);
  const filtered_by_id = starterTasks.filter((t) => t.id == task_id);

  if (filtered_by_id.length === 0) {
    return res.status(404).json({
      Error: "Resource could not be found",
    });
  }
  res.json({
    data: filtered_by_id[0],
  });
});

app.post("/tasks", (req, res) => {
  const new_task = req.body;
  if (
    new_task.title &&
    new_task.priority &&
    typeof new_task.completed === "boolean"
  ) {
    const id =
      starterTasks.length == 0
        ? 1
        : Math.max(...starterTasks.map((t) => t.id)) + 1;
    const modified_task = { ...new_task, id };
    console.log(modified_task);
    starterTasks.push(modified_task);
    res.status(201).json({
      message: "Task posted successfully.",
      data: modified_task,
    });
  } else {
    res.status(400).json({
      error: "Invalid task object.",
    });
  }
});

app.patch("/tasks/:id", (req, res) => {
  //
  const task_id = Number(req.params.id);
  const target = starterTasks.find((t) => t.id == task_id);
  if (!target) {
    return res.status(404).json({
      error: "Resource does not exist.",
    });
  }
  // front end validation should prevent invalid inputs, as well but since there are different ways of making api requests
  //should partial updates be possibe or should the operation be atomic
  try {
    const updates = {};
    if (req.body.priority !== undefined) {
      if (typeof req.body.priority === "string" && req.body.priority.length > 0)
        updates.priority = req.body.priority;
      else {
        throw new Error("Invalid priority provided.");
      }
    }
    if (req.body.title !== undefined) {
      if (typeof req.body.title === "string" && req.body.title.length > 0)
        updates.title = req.body.title;
      else {
        throw new Error("Invalid title provided.");
      }
    }
    if (req.body.completed !== undefined) {
      if (typeof req.body.completed === "boolean")
        updates.completed = req.body.completed;
      else throw new Error("Invalid completion state.");
    }
    Object.assign(target, updates);
    res.status(200).json({
      message: "Resource sucessfully updated.",
      data: target,
    });
  } catch (error) {
    return res.status(400).json({
      error: `Invalid patch request: ${error}`,
    });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const locate_task = starterTasks.findIndex((t) => t.id == id);
  if (locate_task === -1) {
    return res.status(404).json({
      error: "Resouce could not be found.",
    });
  }
  //   console.log(starterTasks);
  //   console.log(" BREAK ");
  //.log(typeof id);
  starterTasks.splice(locate_task, 1);
  return res.status(204).json({
    message: "Resource successfully deleted.",
  });
});
