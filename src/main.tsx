import { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error: any;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: 'white', color: 'red', fontSize: '20px' }}>
          <h1 style={{ fontWeight: 'bold' }}>Application Crashed</h1>
          <pre>{this.state.error?.toString()}</pre>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </ErrorBoundary>
  </StrictMode>,
);
