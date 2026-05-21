const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function adminApiFetch(path, options = {}) {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "A apărut o eroare.");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "Requestul către backend durează prea mult. Verifică dacă serverul rulează."
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function adminLogin(payload) {
  return adminApiFetch("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminLogout() {
  return adminApiFetch("/admin/auth/logout", {
    method: "POST",
  });
}

export function getAdminMe() {
  return adminApiFetch("/admin/auth/me");
}

export function getAdminDashboard() {
  return adminApiFetch("/admin/dashboard");
}

export function getAdminContacts(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return adminApiFetch(
    `/admin/contact-submissions${query ? `?${query}` : ""}`
  );
}

export function getAdminContact(id) {
  return adminApiFetch(`/admin/contact-submissions/${id}`);
}

export function updateAdminContactStatus(id, status) {
  return adminApiFetch(`/admin/contact-submissions/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function getAdminAnalytics(days = 30) {
  return adminApiFetch(`/admin/analytics/overview?days=${days}`);
}

export function getAdminAnalyticsTimeseries(days = 30) {
  return adminApiFetch(`/admin/analytics/timeseries?days=${days}`);
}

export function getAdminBlogPosts(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return adminApiFetch(`/admin/blog${query ? `?${query}` : ""}`);
}

export function getAdminBlogPost(id) {
  return adminApiFetch(`/admin/blog/${id}`);
}

export function createAdminBlogPost(payload) {
  return adminApiFetch("/admin/blog", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdminBlogPost(id, payload) {
  return adminApiFetch(`/admin/blog/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateAdminBlogPostStatus(id, status) {
  return adminApiFetch(`/admin/blog/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function archiveAdminBlogPost(id) {
  return adminApiFetch(`/admin/blog/${id}`, {
    method: "DELETE",
  });
}