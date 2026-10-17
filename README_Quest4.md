# 🟠 Quest 4 → Quest 5 — Full Stack Task Manager

A single evolving application: from React UI and an Express REST API to a persistent, authenticated, collaborative, real-time task management system deployed on AWS.

**Campaign principle:** Quest 4 is the final new project folder. Quest 5 evolves this same repository. Do not rebuild the application from scratch when a new chapter unlocks.

## Campaign map

```text
Quest 3: Vanilla JS + DOM + mock API
                ↓
Quest 4A: React + Tailwind                  [completed]
                ↓
Quest 4B: Node + Express REST API           [in progress]
                ↓
Quest 4C: Task categories + allocation UI   [next chapter]
                ↓
Quest 4D: Local PostgreSQL persistence
                ↓
Quest 4E: Authentication + authorization
                ↓
Quest 4F: Collaboration + task comments
                ↓
Quest 5A: Real-time task chat + updates
                ↓
Quest 5B: Testing, security + reliability
                ↓
Quest 5C: AWS deployment + CI/CD + monitoring
```

**No new Quest 5 folder.** The application, tests, and README evolve in place.

## Rules

1. **You write the implementation.** Guidance should provide contracts, checkpoints, targeted hints, and test cases, not completed solutions unless you explicitly request them.
2. Read the failing test or reproduce the bug before editing.
3. No `getElementById`, `querySelector`, `createElement`, or `appendChild` inside React components.
4. Do not mutate task arrays or task objects when updating React state.
5. Keep API/network logic in a service layer, separate from presentation components.
6. Derive counts, percentages, and filtered views from the task data rather than duplicating them in state.
7. Preserve working behavior as the application evolves. Add tests for new behavior and regressions.
8. Learn locally before adding cloud infrastructure. Security and authorization are server responsibilities, not just frontend conditions.
9. Don't skip ahead: complete the current checkpoint before starting the next chapter.

## Setup

From the project root:

```bash
npm install
npm run dev
```

In another terminal:

```bash
npm test
```

Run the Express server using the script/configuration defined in the project. Confirm both frontend and backend are running before debugging HTTP requests.

---

# Quest 4A — React + Tailwind [completed]

## Checkpoint 1 — Components + props

Build `TaskCard.jsx` and `TaskList.jsx`.

- `TaskCard` receives a `task` prop and renders its title, priority, and `Completed` or `Active`.
- `TaskList` receives `tasks`, renders one `TaskCard` per task, supplies stable React `key` props, and displays `No tasks` when empty.
- Recall `map()`.

## Checkpoint 2 — Derived UI

Implement `TaskStats`. Derive total, completed, and active from the task array. If `tasks` contains the truth, don't create duplicate state.

## Checkpoint 3 — State

In `App.jsx`, replace temporary `const tasks = starterTasks` with React state.

```text
state changes → component runs again → new JSX → React updates necessary DOM
```

## Checkpoint 4 — Controlled form

Build `TaskForm` with title, priority, and submit. Title begins empty; priority begins `medium`. Reject whitespace-only titles. Clear title after successful submission. Have the child communicate submitted data upward to `App`.

## Checkpoint 5 — Add tasks

`App` owns tasks. Add a new task immutably with a unique numeric ID, submitted title/priority, and `completed: false`. `max(existing IDs) + 1` is sufficient for this client-only stage, but not for multi-user persistence.

## Checkpoint 6 — Toggle completion

Add a button to `TaskCard` to toggle the matching task's `completed` field without mutating the task. Identify who owns state, who owns the button, and how callbacks and IDs travel between them.

## Checkpoint 7 — Tailwind pass

Style completed tasks, priorities, focus states, hover states, and mobile layout.

## Checkpoint 8 — API boundary

Introduce a service boundary (`src/services/taskApi.js` or the project's existing service filename) for `fetch`, async/await, JSON, loading, and errors. Replace the mock boundary with the Express API in Quest 4B.

---

# Quest 4B — Express REST API [in progress]

Topics: routing, middleware, REST endpoints, params, bodies, status codes, validation, error handling, CORS, environment configuration, API testing, and the frontend service layer.

### 4B.1 — `GET /tasks/:id` [completed]

- Learn `req.params` and string-to-number conversion where relevant.
- Return one task or a `404` response when absent.

### 4B.2 — `POST /tasks` [completed]

- Learn `express.json()` and `req.body`.
- Validate task data, add the task, and return `201 Created`.

### 4B.3 — `PATCH /tasks/:id` [completed]

- Combine route params and request body.
- Update only supplied fields, preserve other fields, and handle `404` and invalid input.
- Remember that `completed: false` is a valid update even though `false` is falsy.

### 4B.4 — `DELETE /tasks/:id` [completed]

- Find and remove a task by ID.
- Return an appropriate status and handle task-not-found.

### 4B.5 — Server organization [ongoing]

- Separate routing/handlers as the code grows.
- Introduce shared validation/error handling when justified.
- Configure the port via environment settings.

### 4B.6 — API tests [ongoing]

- Test GET, POST, PATCH, DELETE, invalid inputs, and missing resources.
- Test both success paths and failure paths.

### 4B.7 — React ↔ Express [completed for core CRUD; continue hardening]

- Fetch task data through the service layer.
- Handle loading and error states.
- Handle CORS where required.
- Distinguish network failures from HTTP error responses.

### 4B.8 — Service extraction [CURRENT CHECKPOINT]

**Extract `deleteTask(id)` into the existing frontend task service module and call it from React.**

Acceptance criteria:

- The service owns the DELETE HTTP request and response/error handling.
- The React component owns UI state and invokes the service.
- Successful deletion removes the task from the displayed list without mutating state.
- Failed deletion is handled without falsely presenting success.
- Existing add/toggle/display behavior remains functional.

**Resume here when we return.** No solution code in advance.

---

# Quest 4C — Task categories + interactive allocation bar [NEXT]

**Goal:** Extend each task with a `category` field and introduce an interactive, color-coded summary of task distribution.

### 4C.1 — Extend the task contract

Example task shape (illustrative, not implementation code):

```json
{
  "id": 14,
  "title": "Add task categories",
  "priority": "medium",
  "completed": false,
  "category": "frontend"
}
```

- Choose a small initial set of categories, e.g. `frontend`, `backend`, `dsa`, `testing`, `career`.
- Keep **category** distinct from **priority** and **completion status**.
- Decide how legacy tasks without a category should be displayed or migrated.
- Validate category values in the backend, not only in the form.

### 4C.2 — Controlled category input

- Add a category selector to the task form.
- Include the selected category in task creation.
- Ensure API responses preserve the field.

### 4C.3 — Allocation calculations

- Derive category counts from the current task list.
- Compute each category's share of total tasks.
- Handle an empty task list without dividing by zero.
- Define a stable color mapping for categories.

### 4C.4 — Interactive allocation bar

- Render proportional colored segments at the top of the task view.
- Clicking a segment selects that category and filters the displayed task list.
- Clicking the active segment again or selecting **All** clears the filter.
- Display accessible category labels/counts; don't rely on color alone.
- Ensure segments are keyboard-accessible and have visible focus styles.

### 4C.5 — State ownership + tests

- `App` owns the selected category filter.
- The allocation bar reports user selection via callbacks.
- The task list receives a derived filtered array.
- Adding, deleting, and toggling tasks should not break the allocation calculations.
- Test empty categories, one-category-only data, filter clearing, and dynamic updates.

**Key concept:** Derived state, controlled inputs, props/callbacks, array transformations, accessible interaction.

---

# Quest 4D — Local PostgreSQL persistence [LOCKED]

Learn tables, rows, primary/foreign keys, `SELECT`, `INSERT`, `UPDATE`, `DELETE`, joins, constraints, transactions, indexes, and parameterized queries.

- Replace in-memory task storage with PostgreSQL.
- Preserve the task API contract where practical.
- Persist categories, priorities, completion state, and task IDs.
- Understand how database-generated IDs differ from `max(id) + 1`.
- Test persistence across server restarts.

```text
Browser → React/Tailwind → HTTP/JSON → Express → SQL → PostgreSQL
```

---

# Quest 4E — Authentication + authorization [LOCKED]

- Introduce user accounts and secure login/session handling.
- Associate tasks with users or workspaces.
- Enforce permissions on the server for every relevant read/write operation.
- Test that User A cannot read or modify User B's private tasks.
- Learn password hashing, secure cookies/sessions, and input validation.

**Authentication:** Who are you?

**Authorization:** Are you allowed to access this task?

---

# Quest 4F — Collaboration + comments [LOCKED]

- Add task membership/sharing rules.
- Add persistent comments associated with a task and author.
- Display task activity and comment history.
- Validate that only authorized users can read or post comments.
- Consider when a separate task detail view or routing becomes useful; **multiple pages are not required for Quest 4C**.

---

# Quest 5 — Evolve the same app [LOCKED]

## 5A — Real-time collaboration

- Add task-specific instant messaging and live comments with WebSockets or an equivalent real-time transport.
- Handle live task changes, message ordering, acknowledgments, reconnects, and duplicate delivery.
- Persist important messages and verify authorization when clients subscribe to task events.

## 5B — Reliability and security

- Add automated unit/integration tests, permission tests, and failure-scenario tests.
- Introduce structured logging, safe error handling, rate limiting, and operational visibility.
- Test unexpected disconnects and concurrent updates.

## 5C — AWS deployment

- Deploy the same application with a production database (potentially Amazon RDS).
- Configure environment variables/secrets, CI/CD, logs, and monitoring.
- Document architecture, tradeoffs, deployment, and failure-handling decisions.

---

# Debug ritual

```text
CONTRACT: What comes in and what must go out?
STATE:    What does each variable represent?
FAILURE:  What exact assertion/error failed?
VALUE:    What actual value caused it?
TRACE:    What code produced that value?
VERIFY:  What test or observation proves the fix works?
```

## Session bookmark — October 17, 2026

- **Current:** Quest 4B.8, extract `deleteTask(id)` into the frontend task service.
- **Next:** Quest 4C, introduce task `category` and interactive color-coded allocation/filter bar.
- **Long-term:** PostgreSQL → authentication/authorization → task comments → real-time task chat → AWS.
- **Repository:** Continue the existing Quest 4 task-manager folder; do not create a new Quest 5 project.
- **Learning approach:** Implement yourself, use tests and guided debugging, and avoid prematurely receiving full solutions.
