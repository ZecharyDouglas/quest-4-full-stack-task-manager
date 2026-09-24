export default function TaskCard({ task }) {
  // TODO: render title, priority, and Completed/Active status.
  // Later: conditional styling and an onToggle prop.
  return (
    <article
      data-testid="task-card"
      className="rounded-xl border border-slate-700 p-4"
    >
      {
        /* TODO */
        <>
          <h1>{task.title}</h1>
          <p>{task.priority}</p>
          <p>{task.completed ? `completed` : `active`}</p>
        </>
      }
    </article>
  );
}
