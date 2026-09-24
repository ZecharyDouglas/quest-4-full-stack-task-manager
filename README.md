# 🟠 Quest 4 — Full Stack Task Manager

## Campaign map
```text
Quest 3: Vanilla JS + DOM + mock API
              ↓
Quest 4A: React + Tailwind
              ↓
Quest 4B: Node + Express REST API
              ↓
Quest 4C: Local PostgreSQL
              ↓
Quest 4D: React → HTTP → Express → PostgreSQL
              ↓
Quest 5: AWS / RDS
```

## Rules
1. You write the implementation.
2. Read the failing test before editing.
3. No `getElementById`, `querySelector`, `createElement`, or `appendChild` inside React components.
4. Do not mutate task arrays.
5. Do not start Express/PostgreSQL until the React checkpoints are green.

## Setup
```bash
npm install
npm run dev
```
In another terminal:
```bash
npm test
```

# Checkpoint 1 — Components + props
Start with `TaskCard.jsx` and `TaskList.jsx`.

`TaskCard` receives a `task` prop and renders its title, priority, and `Completed` or `Active`.

`TaskList` receives `tasks`, renders one `TaskCard` per task, gives repeated children a stable React `key`, and renders `No tasks` when empty.

Think back to `map()`.

# Checkpoint 2 — Derived UI
Implement `TaskStats`. Derive total/completed/active from the task array. If `tasks` already contains the truth, don't create duplicate state.

# Checkpoint 3 — State
In `App.jsx`, replace the temporary `const tasks = starterTasks` with React state.

Mental model:
```text
state changes → component runs again → new JSX → React updates necessary DOM
```

# Checkpoint 4 — Controlled form
Build `TaskForm` with title, priority, and submit. Title begins empty; priority begins `medium`. Reject whitespace-only titles. Clear title after successful submission. Figure out how the child communicates submitted data upward to `App`.

# Checkpoint 5 — Add tasks
`App` owns tasks. Add a new task immutably. New tasks need a unique numeric ID, submitted title/priority, and `completed:false`. `max(existing IDs)+1` is fine for this client-only stage.

# Checkpoint 6 — Toggle completion
Add a button to `TaskCard`. The matching task should toggle `completed`. Do not mutate the task object. Ask: who owns state, who owns the button, and how does behavior travel down while the ID travels up?

# Checkpoint 7 — Tailwind pass
After behavior works, style completed tasks, priorities, focus states, hover states, and mobile layout.

# Checkpoint 8 — API boundary
Then open `src/services/taskApi.js` and reintroduce `fetch`, async/await, JSON, loading, and errors. Quest 4B will replace the mock boundary with your Express API.

# 🔒 Quest 4B — Express
Later: routing, middleware, REST endpoints, params, bodies, status codes, validation, error handling, env vars, API tests.

# 🔒 Quest 4C — PostgreSQL
**Local PostgreSQL first, not RDS.** Learn tables, rows, primary/foreign keys, SELECT/INSERT/UPDATE/DELETE, joins, constraints, parameterized queries.

# 🔒 Quest 4D — Full stack
Browser → React/Tailwind → HTTP/JSON → Express → SQL → PostgreSQL.

# Debug ritual
```text
CONTRACT: What comes in and what must go out?
STATE: What does each variable represent?
FAILURE: What exact assertion/error failed?
VALUE: What actual value caused it?
TRACE: What code produced that value?
```
