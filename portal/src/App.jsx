import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Dashboard from "./pages/Dashboard.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

function ProtectedLayout({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          <div className="flex min-h-screen items-center justify-center bg-black">
            <SignIn routing="path" path="/sign-in" />
          </div>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/proiecte/:id"
        element={
          <ProtectedLayout>
            <ProjectDetail />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
