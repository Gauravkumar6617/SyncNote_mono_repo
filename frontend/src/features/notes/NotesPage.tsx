export default function NotesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Secure Notes Repository</h1>
      <p className="text-slate-400 text-sm">
        All entries are encrypted locally.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h3 className="font-semibold text-white mb-1">
            Architecture Roadmap
          </h3>
          <p className="text-slate-400 text-xs">
            Setup React Router v7 and state hooks.
          </p>
        </div>
      </div>
    </div>
  );
}
