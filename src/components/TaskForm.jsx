import { useState } from "react";

export default function TaskForm() {
  // TODO: controlled React form: title + priority(low/medium/high/urgent) + submit.
  // Do NOT use document.getElementById/querySelector.
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskCompleted, setTaskCompleted] = useState(false);

  return (
    <form className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-semibold">Add task</h2>
      <p className="text-sm text-slate-400">
        TODO: your first controlled React form goes here.
      </p>
      <input
        type="text"
        placeholder="Enter Title"
        value={taskTitle}
        onChange={(e) => {
          setTaskTitle(e.target.value);
        }}
        className=" border border-white rounded-lg my-2"
      />
      <div>
        <select
          name="Task Priorities"
          id=""
          onChange={(e) => {
            setTaskPriority(e.target.value);
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </form>
  );
}
