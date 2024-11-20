import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { useState } from "react";
import { AppProvider } from "./contexts/AppContext";
import { auth } from "./lib/firebase";
import { ImageSelectionForm } from "./components/Pic";

function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="home" element={<Home />} />
            <Route path="pic" element={<ImageSelectionForm />} />
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}

export default App;
