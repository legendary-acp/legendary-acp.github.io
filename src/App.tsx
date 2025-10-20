import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import ReadingLogPage from "./pages/ReadingLogPage";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reading-log" element={<ReadingLogPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
