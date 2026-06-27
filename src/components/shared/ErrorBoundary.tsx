import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-semibold text-primary">
          Something went wrong
        </h1>
        <p className="mt-2 text-muted">
          An unexpected error occurred. Reloading usually fixes it.
        </p>
        <button
          onClick={this.handleReload}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-brand/70 px-4 py-2 text-sm font-medium text-brand hover:bg-brand-subtle transition focus-ring"
        >
          Reload page
        </button>
      </div>
    );
  }
}
