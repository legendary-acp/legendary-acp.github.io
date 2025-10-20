import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

interface PDFViewerProps {
  isOpen: boolean;
  pdfPath?: string;
  title: string;
  onClose: () => void;
}

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFViewer({
  isOpen,
  pdfPath,
  title,
  onClose,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadPDF = async () => {
      setLoading(true);
      try {
        const pdf = await pdfjsLib.getDocument(pdfPath).promise;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [isOpen, pdfPath]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  if (!pdfPath) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-semibold text-slate-900 mb-2">{title}</h2>
          <p className="text-sm text-slate-600 mb-4">PDF not available</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 truncate pr-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            aria-label="Close"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-auto bg-slate-100 flex items-center justify-center">
          {loading ? (
            <div className="text-slate-500">Loading PDF...</div>
          ) : (
            <iframe
              src={`${pdfPath}#toolbar=1&navpanes=0`}
              className="w-full h-full"
              title={title}
            />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-white">
          <div className="text-sm text-slate-600">
            {numPages > 0 && `${currentPage} / ${numPages}`}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>

            <button
              onClick={() =>
                setCurrentPage(Math.min(numPages, currentPage + 1))
              }
              disabled={currentPage === numPages}
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>

            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
