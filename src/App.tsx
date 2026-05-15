import { ThemeProvider } from "./design/context/ThemeContext";
import { TimeProvider } from "./design/context/TimeContext";
import NothingPlaygroundPage from "./pages/NothingPlaygroundPage";

function App() {
  return (
    <ThemeProvider>
      <TimeProvider>
        <NothingPlaygroundPage />
      </TimeProvider>
    </ThemeProvider>
  );
}

export default App;
