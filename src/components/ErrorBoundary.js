import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error (you can send this to error reporting service)
    console.warn('ErrorBoundary caught an error:', error, errorInfo);
    
    // Ignore ResizeObserver errors as they're harmless
    if (error.message && error.message.includes('ResizeObserver')) {
      this.setState({ hasError: false, error: null });
      return;
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          border: '3px solid red',
          color: 'white',
          fontFamily: 'Bungee, sans-serif',
          textAlign: 'center',
          margin: '20px'
        }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              background: 'red',
              color: 'white',
              border: '2px solid white',
              padding: '8px 16px',
              fontFamily: 'Bungee, sans-serif',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;