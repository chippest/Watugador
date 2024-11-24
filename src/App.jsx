import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import { Watugador } from "./Watugador";

function App() {
  return (
    <>
      <AppProvider>
        <Watugador />
      </AppProvider>
    </>
  );
}

export default App;
