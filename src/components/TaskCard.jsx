export default function TaskCard({ task, onToggleTask }) {
  // TODO: render title, priority, and Completed/Active status.
  // Later: conditional styling and an onToggle prop.
  let priority_color;
  switch (task.priority) {
    case "low":
      priority_color = `text-slate-100/40`;
      break;
    case "medium":
      priority_color = `text-orange-400/40`;
      break;
    case "high":
      priority_color = `text-orange-500/40`;
      break;
    case "urgent":
      priority_color = `text-red-500/40`;
      break;

    default:
      break;
  }
  let activity_color;
  switch (task.completed) {
    case true:
      activity_color = `text-green-300/70`;
      break;
    case false:
      activity_color = `text-slate-300/70`;
      break;

    default:
      break;
  }

  return (
    <article
      data-testid="task-card"
      className="rounded-xl border border-slate-700 p-4"
    >
      {
        /* TODO */
        <>
          <div className=" flex justify-between items-baseline mb-2">
            <h1
              className={` text-lg text-slate-100 ${task.completed ? "line-through text-slate-100/80" : ""}`}
            >
              {task.title}
            </h1>

            <span
              className={`text-sm border px-1 bg-slate-100/10 rounded-md capitalize ${priority_color}`}
            >
              {task.priority}
            </span>
          </div>
          <div
            className={` inline-flex flex-row mb-2 gap-2 items-center px-2 border rounded-xl ${task.completed ? `border border-green-400` : `border border-slate-100/40`}  bg-slate-700 text-sm my-1`}
          >
            <span
              className={`inline-block h-2.5 w-2.5 rounded-full bg-slate-100/80`}
            ></span>
            <p className={`${activity_color}`}>
              {task.completed ? `completed` : `active`}
            </p>
          </div>

          <div className=" flex my-2">
            <button
              className=" border border-slate-500 rounded-lg cursor-pointer p-1 active:bg-slate-500 active:text-slate-800 hover:bg-slate-700"
              onClick={() => onToggleTask(task.id)}
            >
              Complete
            </button>
          </div>
        </>
      }
    </article>
  );
}
