export default function TaskStats({ tasks }) {
  // TODO: derive total, completed, active from tasks. Do not store derived values in state.
  let total = 0,
    completed = 0,
    active = 0;
  //self calling function NOTICE WRAPPING OF FUNCTION BODY IN PARENTHESIS
  total = tasks.length;

  tasks.forEach((t) => {
    t.completed ? (completed += 1) : (active += 1);
  });
  const category_count = tasks.reduce(
    (acc, curr) => {
      if (curr.category === "frontend") acc.frontend += 1;
      else if (curr.category === "backend") acc.backend += 1;
      else if (curr.category === "dsa") acc.dsa += 1;
      else if (curr.category === "testing") acc.testing += 1;
      else if (curr.category === "career") acc.career += 1;
      return acc;
    },
    {
      frontend: 0,
      backend: 0,
      dsa: 0,
      testing: 0,
      career: 0,
    },
  );
  return (
    <>
      <section className="grid grid-cols-3 gap-3" aria-label="Task statistics">
        <Stat label="Total" value={total} />
        <Stat label="Completed" value={completed} />
        <Stat label="Active" value={active} />
      </section>
      <section className=" flex flex-row mt-3">
        <button
          style={{ flexGrow: category_count.frontend }}
          className="rounded-lg basis-0 border border-slate-800 bg-red-400 p-4"
        >
          frontend
        </button>
        <button
          style={{ flexGrow: category_count.backend }}
          className="rounded-lg basis-0  border border-slate-800 bg-cyan-300 p-4"
        >
          backend
        </button>
        <button
          style={{ flexGrow: category_count.dsa }}
          className="rounded-lg basis-0  border border-slate-800 bg-blue-400 p-4"
        >
          dsa
        </button>
        <button
          style={{ flexGrow: category_count.testing }}
          className="rounded-lg basis-0  border border-slate-800 bg-purple-300 p-4"
        >
          testing
        </button>
        <button
          style={{ flexGrow: category_count.career }}
          className="rounded-lg basis-0  border border-slate-800 bg-orange-300 p-4"
        >
          career
        </button>
      </section>
    </>
  );
}
function Stat({ label, value }) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <span className="text-sm text-slate-400">{label}</span>
      <strong className="mt-1 block text-2xl">{value}</strong>
    </article>
  );
}
