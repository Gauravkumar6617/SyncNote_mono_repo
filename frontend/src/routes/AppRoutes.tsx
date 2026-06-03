import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { MainLayout } from "../components/MainLayout";
import { PATHS } from "./path";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Dynamic imports for optimized build chunking
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const NotesListPage = lazy(() => import("../pages/NotesListPage"));
const NoteEditorPage = lazy(() => import("../pages/NoteEditorPage"));
const SharedNotesPage = lazy(() => import("../pages/SharedNotesPage"));

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#999" }}>Loading...</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: PATHS.PUBLIC.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.PUBLIC.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: PATHS.PRIVATE.DASHBOARD,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PRIVATE.NOTES,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotesListPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PRIVATE.NOTE_EDITOR,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NoteEditorPage />
          </Suspense>
        ),
      },
      {
        path: PATHS.PRIVATE.SHARED_NOTES,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SharedNotesPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1a1a1a",
          color: "#999",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "white",
            margin: 0,
          }}
        >
          404
        </h1>
        <p style={{ margin: "1rem 0 0 0" }}>
          The route you specified does not exist.
        </p>
      </div>
    ),
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
