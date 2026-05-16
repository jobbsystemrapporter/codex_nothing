import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { DotText } from "../design/primitives/DotText";

export function LoginScreen() {
  const { login, register, demoLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(username, password);
      } else {
        await register(username, password, displayName || undefined);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setError("");
    demoLogin();
  };

  return (
    <div className="nothing-grid-bg flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-[420px]">
        <div className="mb-10 text-center">
          <DotText value="NOTHING OS" className="text-[42px] leading-[0.9] tracking-[0.02em]" />
          <p className="mt-3 text-[13px] tracking-[0.08em] text-[var(--text-muted)] uppercase">
            Web Operating System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="nothing-card p-6 @min-[360px]:p-8">
          <div className="mb-6">
            <label className="nothing-label mb-2 block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all focus:ring-[var(--danger)]"
              placeholder="Enter username"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="nothing-label mb-2 block">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all focus:ring-[var(--danger)]"
                placeholder="Your name"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="nothing-label mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[14px] bg-[var(--surface)] px-4 py-3 text-[15px] text-[var(--text)] outline-none ring-1 ring-[var(--border)] transition-all focus:ring-[var(--danger)]"
              placeholder="Enter password"
              required
            />
          </div>

          {error && (
            <p className="mb-4 text-[13px] text-[var(--danger)]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[var(--danger)] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[13px] text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {isLogin ? "Need an account? Register" : "Already have an account? Sign In"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-5 border-t border-[var(--border)] pt-5 text-center">
              <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                No server? No problem.
              </p>
              <button
                type="button"
                onClick={handleDemo}
                className="w-full rounded-full bg-[var(--white)] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                Enter Demo Mode
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
