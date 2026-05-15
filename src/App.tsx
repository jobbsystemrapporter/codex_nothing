import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./design/context/ThemeContext";
import { TimeProvider } from "./design/context/TimeContext";
import { LoginScreen } from "./components/LoginScreen";
import { Desktop } from "./components/Desktop";

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="nothing-grid-bg flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-3 w-3 rounded-full bg-[var(--danger)]" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Loading</span>
        </div>
      </div>
    );
  }

  return user ? <Desktop /> : <LoginScreen />;
}

function App() {
  return (
    <ThemeProvider>
      <TimeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TimeProvider>
    </ThemeProvider>
  );
}

export default App;
