export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Dashboard Workspace</h1>
      <p className="text-slate-400 text-sm">
        Welcome back. Here is your operational overview.
      </p>
      <div className="h-40 bg-slate-900 rounded-xl border border-slate-800 p-6">
        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold block mb-2">
          Metrics Container
        </span>
        <div className="text-2xl font-semibold text-[#ff5b04]">
          System Stable
        </div>
      </div>
    </div>
  );
}
