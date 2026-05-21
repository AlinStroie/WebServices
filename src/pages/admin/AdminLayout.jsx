import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { adminLogout, getAdminMe } from "../../lib/adminApi";

function AdminLayout() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await getAdminMe();
        setAdmin(response.data);
      } catch {
        navigate("/admin/login", { replace: true });
      } finally {
        setChecking(false);
      }
    }

    checkAuth();
  }, [navigate]);

  async function handleLogout() {
    await adminLogout();
    navigate("/admin/login", { replace: true });
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Se verifică sesiunea...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-[#080808] p-5 lg:block">
        <Link to="/admin" className="block rounded-3xl bg-white/[0.04] p-5">
          <p className="text-sm uppercase tracking-[0.28em] text-white/35">
            A Squared
          </p>
          <h1 className="mt-2 text-xl font-semibold">Admin Panel</h1>
        </Link>

        <nav className="mt-8 space-y-2">
          <AdminNavLink to="/admin" icon={<LayoutDashboard size={18} />} end>
            Dashboard
          </AdminNavLink>

          <AdminNavLink to="/admin/blog" icon={<FileText size={18} />}>
            Blog
          </AdminNavLink>

          <AdminNavLink to="/admin/contacts" icon={<Inbox size={18} />}>
            Cereri contact
          </AdminNavLink>

          <AdminNavLink to="/admin/analytics" icon={<BarChart3 size={18} />}>
            Analytics
          </AdminNavLink>
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-sm text-white/40">Logat ca</p>
            <p className="mt-1 truncate text-sm font-medium">{admin?.email}</p>
            <p className="mt-1 text-xs text-white/35">{admin?.role}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-white hover:text-black"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 px-5 py-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Admin Panel</p>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/60"
          >
            Logout
          </button>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto">
          <MobileNavLink to="/admin" end>
            Dashboard
          </MobileNavLink>
          <MobileNavLink to="/admin/blog">Blog</MobileNavLink>
          <MobileNavLink to="/admin/contacts">Contacte</MobileNavLink>
          <MobileNavLink to="/admin/analytics">Analytics</MobileNavLink>
        </nav>
      </header>

      <main className="min-h-screen px-5 py-8 lg:ml-72 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

function AdminNavLink({ to, icon, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
          ? "bg-white text-black"
          : "text-white/55 hover:bg-white/[0.06] hover:text-white"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

function MobileNavLink({ to, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `shrink-0 rounded-full px-4 py-2 text-sm ${isActive ? "bg-white text-black" : "bg-white/[0.06] text-white/55"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default AdminLayout;