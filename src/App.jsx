import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskStats from "./components/TaskStats.jsx";
import { starterTasks } from "./starterData.js";

export default function App() {
  // TODO 1: Replace this temporary value with React state.
  // TODO 2: Write handleAddTask(taskData) without mutating the old array.
  // TODO 3: Later, write handleToggleTask(id)...
  const tasks = starterTasks;
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl p-6 md:p-10">
        <header className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-[.25em] text-orange-400">
            QUEST 4A
          </p>
          <h1 className="text-4xl font-bold">Full Stack Task Manager</h1>
          <p className="mt-3 text-slate-400">
            React owns the UI now. PostgreSQL is still sleeping.
          </p>
        </header>
        <TaskStats tasks={tasks} />
        <section className="mt-8 grid gap-6 md:grid-cols-[.8fr_1.2fr]">
          <TaskForm />
          <TaskList tasks={tasks} />
        </section>
      </div>
    </main>
  );
}
