import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, test, afterEach } from "vitest";
import TaskStats from "../src/components/TaskStats.jsx";
import TaskList from "../src/components/TaskList.jsx";
import TaskCard from "../src/components/TaskCard.jsx";
const tasks = [
  { id: 10, title: "Active urgent", priority: "urgent", completed: false },
  { id: 11, title: "Finished low", priority: "low", completed: true },
];
describe("Quest 4A", () => {
  test("1) TaskStats derives counts", () => {
    render(<TaskStats tasks={tasks} />);
    expect(screen.getByText("Total").parentElement).toHaveTextContent("2");
    expect(screen.getByText("Completed").parentElement).toHaveTextContent("1");
    expect(screen.getByText("Active").parentElement).toHaveTextContent("1");
  });
  test("2) TaskCard renders task information", () => {
    render(<TaskCard task={tasks[0]} />);
    expect(screen.getByText("Active urgent")).toBeInTheDocument();
    expect(screen.getByText("urgent")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
  });
  test("3) TaskList renders one card per task", () => {
    render(<TaskList tasks={tasks} />);
    expect(screen.getAllByTestId("task-card")).toHaveLength(2);
  });
  test("4) TaskList handles empty list", () => {
    render(<TaskList tasks={[]} />);
    expect(screen.getByText(/no tasks/i)).toBeInTheDocument();
  });
});
afterEach(() => {
  cleanup();
});
