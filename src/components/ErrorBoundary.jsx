import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red', background: '#ffebee', borderRadius: '8px' }}>
          <h2>Something went wrong in Leaderboard!</h2>
          <pre>{this.state.error.toString()}</pre>
          <pre style={{fontSize:'0.8rem'}}>{this.state.error.stack}</pre>
        </div>
      );
    }

    return this.props.children; 
  }
}
