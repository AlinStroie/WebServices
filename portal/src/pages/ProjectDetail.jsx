import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ArrowLeft } from "lucide-react";

import { portalApiFetch } from "../lib/api.js";

function ProjectDetail() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    portalApiFetch(`/portal/projects/${id}`, getToken)
      .then((response) => setProject(response.data))
      .catch(() => setError("Nu am putut încărca proiectul."));
  }, [id, getToken]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"
        >
          <ArrowLeft size={16} />
          Înapoi la proiecte
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {error && <p className="text-white/50">{error}</p>}
        {!error && !project && <p className="text-white/50">Se încarcă...</p>}

        {project && (
          <>
            <h1 className="text-2xl font-semibold">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-white/50">{project.description}</p>
            )}

            <h2 className="mt-8 text-lg font-semibold">Fișiere</h2>
            <div className="mt-4 space-y-2">
              {project.files.length === 0 && (
                <p className="text-white/40">Niciun fișier momentan.</p>
              )}
              {project.files.map((file) => (
                <div
                  key={file.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
                >
                  {file.fileName}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ProjectDetail;
