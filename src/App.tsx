import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/HomePage";
import LogPage from "./pages/ReadingLogPage";
import "./styles/globals.css";
import NotesPage from "./pages/NotesPage";
import BlogPost from "./pages/BlogPost";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
    <div className="min-h-dvh bg-page text-primary flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/logs" element={<LogPage />} />
          <Route path="/notes/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </ThemeProvider>
  );
}
