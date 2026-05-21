import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

import { adminLogin } from "../../lib/adminApi";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await adminLogin(form);

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login eșuat.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 text-white">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        <p className="text-sm uppercase tracking-[0.3em] text-white/35">
          Admin Panel
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Autentificare
        </h1>

        <p className="mt-3 text-sm leading-6 text-white/45">
          Acces securizat pentru administrarea site-ului, cererilor și
          statisticilor.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-white/50">
              <Mail size={16} />
              Email
            </span>

            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
              placeholder="admin@asquaredstudio.ro"
              autoComplete="email"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm text-white/50">
              <Lock size={16} />
              Parolă
            </span>

            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-white/30"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Se verifică..." : "Intră în admin"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminLogin;