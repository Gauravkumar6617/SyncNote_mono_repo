import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../components/MainLayout";
import { PATHS } from "./path";

// Dynamic imports for optimized build chunking
const DashboardPage = lazy(() => import("../features/dasboard/DashboardPage"));
const NotesPage = lazy(() => import("../features/notes/NotesPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: PATHS.PRIVATE.DASHBOARD,
        element: (
          <Suspense
            fallback={
              <div className="text-slate-400 text-sm">Loading page...</div>
            }
          >
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PRIVATE.NOTES,
        element: (
          <Suspense
            fallback={
              <div className="text-slate-400 text-sm">Loading notes...</div>
            }
          >
            <NotesPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex flex-col items-center justify-center gap-2">
        <h1 className="text-4xl font-black text-white">404</h1>
        <p className="text-sm">The route you specified does not exist.</p>
      </div>
    ),
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
