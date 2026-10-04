// Locked until the React-only checkpoints work.
// Later you will reintroduce fetch, async/await, HTTP errors and JSON here.
async function getTasks() {
  const url = "";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const task_data = await response.json();
  return task_data;
}
