import { useEffect, useRef, useState } from "react";
import {
  getDocument,
  GlobalWorkerOptions,
  type PDFDocumentProxy,
  type RenderTask,
} from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PDFViewerProps {
  isOpen: boolean;
  pdfPath?: string;
  title: string;
  onClose: () => void;
}

export default function PDFViewer({
  isOpen,
  pdfPath,
  title,
  onClose,
}: PDFViewerProps) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen || !pdfPath) return;

    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const doc = await getDocument({ url: pdfPath, withCredentials: false })
          .promise;
        if (cancelled) return;
        setPdf(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error loading PDF:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      setPdf(() => {
        return null;
      });
    };
  }, [isOpen, pdfPath]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    let cleanup = () => {};
    if (!pdf || !canvasRef.current || !containerRef.current) return;
    let renderTask: RenderTask | null = null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = async () => {
      if (!ctx) return;
      const page = await pdf.getPage(currentPage);

      const containerWidth = containerRef.current!.clientWidth || 800;
      const viewport = page.getViewport({ scale: 1 });
      const scale = containerWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      canvas.width = Math.floor(scaledViewport.width);
      canvas.height = Math.floor(scaledViewport.height);
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;

      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
      renderTask = page.render({
        canvasContext: ctx,
        viewport: scaledViewport,
        canvas: canvas,
      });
      await renderTask.promise;
    };

    const ro = new ResizeObserver(() => render());
    ro.observe(containerRef.current);

    render();

    cleanup = () => {
      ro.disconnect();
      if (renderTask && renderTask.cancel) {
        renderTask.cancel();
      }
    };

    return cleanup;
  }, [pdf, currentPage]);

  if (!isOpen) return null;

  if (!pdfPath) {
    return (
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
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
        <div
          ref={containerRef}
          className="flex-grow overflow-auto bg-slate-100"
        >
          {loading ? (
            <div className="text-slate-500">Loading PDF...</div>
          ) : (
            <div className="bg-white shadow rounded-lg my-auto mx-auto">
              <canvas
                ref={canvasRef}
                className="block"
                style={{ touchAction: "pan-y" }}
              />
            </div>
          )}
        </div>
        {/* Footer */}
        <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-white">
          <div className="text-sm text-slate-600">
            {numPages > 0 ? `${currentPage} / ${numPages}` : ""}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Prev
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
              disabled={currentPage >= numPages}
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
