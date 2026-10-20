// Locked until the React-only checkpoints work.
// Later you will reintroduce fetch, async/await, HTTP errors and JSON here.
export async function getTasks() {
  const url = "http://localhost:3000/tasks";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const task_data = await response.json();
  return task_data.data;
}

export async function deleteTask(id) {
  const url = `http://localhost:3000/tasks/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  if (!response.ok) {
    //Error doesnt concatenate so template literals are needed
    throw new Error(`Failed to delete error code: ${response.status}`);
  }
  if (response.status === 204) {
    return;
  }
  const data = await response.json();
  return data;
}

export async function postTask(task) {
  const url = `http://localhost:3000/tasks/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Failed to post task: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data.data;
}
