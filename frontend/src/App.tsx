import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700 text-center space-y-6">
        {/* Tailwind v4 Status Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            SyncNote Test
          </h1>
          <p className="text-slate-400 text-sm">
            Testing frontend configuration and styling pipelines.
          </p>
        </div>

        {/* Verification Checklist */}
        <div className="bg-slate-900/50 rounded-xl p-4 text-left space-y-2 text-sm border border-slate-700/50">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>Vite Development Server running</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>
              Tailwind v4 compiling (Check if background is dark slate)
            </span>
          </div>
        </div>

        {/* State Management Check */}
        <div className="space-y-3">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Interactive State Test
          </p>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="w-full py-3 px-4 font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl shadow-lg transition-transform active:scale-98"
          >
            Count is: {count}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
