import { Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import PapersPage from "./pages/PapersPage";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/papers" element={<PapersPage />} />
          {/* Future routes */}
          {/* <Route path="/blog" element={<BlogPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
