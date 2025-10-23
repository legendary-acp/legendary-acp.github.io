import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LogPage from "./pages/ReadingLogPage";
import "./styles/globals.css";
import NotesPage from "./pages/NotesPage";

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/logs" element={<LogPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
