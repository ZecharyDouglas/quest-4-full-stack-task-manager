export default function TaskStats({tasks}){
 // TODO: derive total, completed, active from tasks. Do not store derived values in state.
 const total=0, completed=0, active=0;
 return <section className="grid grid-cols-3 gap-3" aria-label="Task statistics"><Stat label="Total" value={total}/><Stat label="Completed" value={completed}/><Stat label="Active" value={active}/></section>;
}
function Stat({label,value}){return <article className="rounded-xl border border-slate-800 bg-slate-900 p-4"><span className="text-sm text-slate-400">{label}</span><strong className="mt-1 block text-2xl">{value}</strong></article>}
