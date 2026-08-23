import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";

import { portalApiFetch } from "../lib/api.js";

function Dashboard() {
  const { getToken } = useAuth();
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    portalApiFetch("/portal/projects", getToken)
      .then((response) => setProjects(response.data))
      .catch(() => setError("Nu am putut încărca proiectele."));
  }, [getToken]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <p className="text-lg font-semibold">A² Studio — Portal client</p>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Proiectele tale</h1>

        {error && <p className="mt-6 text-white/50">{error}</p>}

        {!error && !projects && (
          <p className="mt-6 text-white/50">Se încarcă...</p>
        )}

        {projects && projects.length === 0 && (
          <p className="mt-6 text-white/50">
            Nu ai încă niciun proiect vizibil aici.
          </p>
        )}

        <div className="mt-6 space-y-3">
          {projects?.map((project) => (
            <Link
              key={project.id}
              to={`/proiecte/${project.id}`}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.06]"
            >
              <p className="font-medium">{project.name}</p>
              {project.description && (
                <p className="mt-1 text-sm text-white/50">
                  {project.description}
                </p>
              )}
              <p className="mt-3 text-xs text-white/35">
                {project.files.length} fișiere
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
