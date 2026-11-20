import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  // TODO: controlled React form: title + priority(low/medium/high/urgent) + submit.
  // Do NOT use document.getElementById/querySelector.
  const [taskTitle, setTaskTitle] = useState("");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskCategory, setTaskCategory] = useState("dsa");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObject = {
      title: taskTitle,
      priority: taskPriority,
      category: taskCategory,
      completed: taskCompleted,
    };
    onAddTask(taskObject);
    setTaskTitle("");
    setTaskPriority("medium");
    setTaskCategory("dsa");
    setTaskCompleted(false);
  };

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
      <div className="flex justify-between">
        <select
          name="Task Priorities"
          id=""
          placeholder="Priority Level"
          value={taskPriority}
          onChange={(e) => {
            setTaskPriority(e.target.value);
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <select
          name="Task Categories"
          id=""
          placeholder="Category"
          value={taskCategory}
          onChange={(e) => {
            setTaskCategory(e.target.value);
          }}
        >
          <option value="frontend">frontend</option>
          <option value="backend">backend</option>
          <option value="dsa">dsa</option>
          <option value="testing">testing</option>
          <option value="career">career</option>
        </select>
      </div>
      <div>
        <button
          className="flex flex-row bg-green p-2 border border-white rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
