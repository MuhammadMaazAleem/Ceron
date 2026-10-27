import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Robust React Error Boundary component that traps render-phase runtime errors
 * and renders an accessible, elegant recovery card instead of a blank white screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Unhandled component error trapped by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  private handleGoHome = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.hash = '#/';
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="my-6 mx-auto max-w-lg p-6 bg-red-50 border border-red-200 rounded-2xl shadow-sm text-center"
          style={{
            background: 'var(--card-bg, #ffffff)',
            border: '1px solid var(--border-color, #fecaca)',
            borderRadius: '16px',
            padding: '24px',
            margin: '20px auto',
            maxWidth: '520px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626',
            }}
          >
            <AlertTriangle size={28} />
          </div>

          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--text-primary, #1e293b)',
              marginBottom: '8px',
            }}
          >
            {this.props.fallbackTitle || 'Something went wrong in this section'}
          </h2>

          <p
            style={{
              fontSize: '0.925rem',
              color: 'var(--text-secondary, #64748b)',
              marginBottom: '20px',
              lineHeight: 1.5,
            }}
          >
            {this.props.fallbackMessage ||
              this.state.error?.message ||
              'An unexpected error occurred. Your progress has been saved.'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={this.handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: 'var(--primary, #6366f1)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <RefreshCw size={16} /> Try Again
            </button>

            <button
              onClick={this.handleGoHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-secondary, #f1f5f9)',
                color: 'var(--text-primary, #334155)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                border: '1px solid var(--border-color, #cbd5e1)',
              }}
            >
              <Home size={16} /> Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
