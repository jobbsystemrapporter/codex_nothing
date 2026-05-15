const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) localStorage.setItem("nothing-token", token);
    else localStorage.removeItem("nothing-token");
  }

  getToken(): string | null {
    if (!this.token) this.token = localStorage.getItem("nothing-token");
    return this.token;
  }

  private async request(method: string, path: string, body?: unknown) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = this.getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`);
    return data;
  }

  get(path: string) { return this.request("GET", path); }
  post(path: string, body?: unknown) { return this.request("POST", path, body); }
  put(path: string, body?: unknown) { return this.request("PUT", path, body); }
  patch(path: string, body?: unknown) { return this.request("PATCH", path, body); }
  del(path: string) { return this.request("DELETE", path); }
}

export const api = new ApiClient();
