import { Outlet, Link, useLocation } from "react-router-dom";
import { PATHS } from "../routes/path";

export const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: PATHS.PRIVATE.DASHBOARD },
    { name: "My Notes", path: PATHS.PRIVATE.NOTES },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Shared Application Header */}
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5b04]" />
          <span className="font-bold text-xl tracking-tight text-white">
            SyncNote
          </span>
        </div>
        <div className="flex gap-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#ff5b04]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Dynamic Content Viewport */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <Outlet /> {/* Target area where your pages will render */}
      </main>
    </div>
  );
};
