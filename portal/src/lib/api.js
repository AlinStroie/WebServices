const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function portalApiFetch(path, getToken, options = {}) {
  const token = await getToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "A apărut o eroare.");
  }

  return data;
}
