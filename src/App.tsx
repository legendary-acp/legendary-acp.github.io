import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import "./styles/globals.css";

// Lazy-load pages so each route gets its own chunk
const HomePage   = lazy(() => import("./pages/HomePage"));
const NotesPage  = lazy(() => import("./pages/NotesPage"));
const LogPage    = lazy(() => import("./pages/ReadingLogPage"));
const BlogPost   = lazy(() => import("./pages/BlogPost"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[40vh]">
      <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-page text-primary flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/notes"       element={<NotesPage />} />
              <Route path="/logs"        element={<LogPage />} />
              <Route path="/notes/:slug" element={<BlogPost />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
