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

  if (req.body.priority) {
    target.priority = req.body.priority;
  }
  if (req.body.title) {
    target.title = req.body.title;
  }
  if (req.body?.completed !== undefined) {
    target.completed = req.body.completed;
  }
  res.status(200).json({
    message: "Resource sucessfully updated.",
    data: target,
  });
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
  return res.status(200).json({
    message: "Resource successfully deleted.",
  });
});
