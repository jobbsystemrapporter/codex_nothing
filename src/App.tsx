import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./design/context/ThemeContext";
import { TimeProvider } from "./design/context/TimeContext";
import { WidgetSettingsProvider } from "./context/WidgetSettingsContext";
import { LoginScreen } from "./components/LoginScreen";
import { Desktop } from "./components/Desktop";
import { WidgetRegistry } from "./components/WidgetRegistry";

function WidgetStandalone({ type }: { type: string }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center nothing-grid-bg p-6">
      <div className="w-full max-w-[420px]">
        <WidgetRegistry type={type} />
      </div>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const widgetType = params.get("widget");

  // Standalone widget mode — used by Übersicht and external embeds
  if (widgetType) {
    return <WidgetStandalone type={widgetType} />;
  }

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
          <WidgetSettingsProvider>
            <AppContent />
          </WidgetSettingsProvider>
        </AuthProvider>
      </TimeProvider>
    </ThemeProvider>
  );
}

export default App;
