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

export function getAdminCaseStudies(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return adminApiFetch(`/admin/case-studies${query ? `?${query}` : ""}`);
}

export function getAdminCaseStudy(id) {
  return adminApiFetch(`/admin/case-studies/${id}`);
}

export function createAdminCaseStudy(payload) {
  return adminApiFetch("/admin/case-studies", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAdminCaseStudy(id, payload) {
  return adminApiFetch(`/admin/case-studies/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function updateAdminCaseStudyStatus(id, status) {
  return adminApiFetch(`/admin/case-studies/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function archiveAdminCaseStudy(id) {
  return adminApiFetch(`/admin/case-studies/${id}`, {
    method: "DELETE",
  });
}

export function getAdminClients() {
  return adminApiFetch("/admin/clients");
}

export function inviteAdminClient(payload) {
  return adminApiFetch("/admin/clients/invite", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createAdminClientProject(clerkUserId, payload) {
  return adminApiFetch(`/admin/clients/${clerkUserId}/projects`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}