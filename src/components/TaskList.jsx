import TaskCard from "./TaskCard.jsx";
export default function TaskList({ tasks }) {
  // TODO: render one TaskCard per task with a stable key.
  // TODO: if tasks is empty, render text containing "No tasks".
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-semibold">Tasks</h2>
      <div data-testid="task-list" className="space-y-3">
        {
          /* TODO */
          tasks.length == 0 ? (
            <>`No tasks`</>
          ) : (
            tasks.map((t) => {
              return <TaskCard task={t} key={t.id} />;
            })
          )
        }
      </div>
    </section>
  );
}
