import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Debug = () => {
  const navigate = useNavigate();
  const [cacheStatus, setCacheStatus] = useState<string>('Unknown');
  const [storageStatus, setStorageStatus] = useState<string>('Unknown');
  const [performanceMetrics, setPerformanceMetrics] = useState<any>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Get performance metrics on component mount - only on client
    if (isClient && typeof window !== 'undefined' && 'performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      setPerformanceMetrics({
        loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
        domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
        firstPaint: Math.round(perfData.responseEnd - perfData.fetchStart),
        totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
      });
    }
  }, [isClient]);

  const clearCache = async () => {
    if (!isClient) return;
    
    try {
      // Clear various caches
      if (typeof window !== 'undefined' && 'caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear localStorage
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.clear();
      }
      
      // Clear sessionStorage
      if (typeof window !== 'undefined' && sessionStorage) {
        sessionStorage.clear();
      }
      
      setCacheStatus('Cache cleared successfully!');
      setTimeout(() => setCacheStatus('Unknown'), 3000);
    } catch (error) {
      setCacheStatus('Error clearing cache');
      setTimeout(() => setCacheStatus('Unknown'), 3000);
    }
  };

  const clearStorage = () => {
    if (!isClient) return;
    
    try {
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.clear();
      }
      if (typeof window !== 'undefined' && sessionStorage) {
        sessionStorage.clear();
      }
      setStorageStatus('Storage cleared successfully!');
      setTimeout(() => setStorageStatus('Unknown'), 3000);
    } catch (error) {
      setStorageStatus('Error clearing storage');
      setTimeout(() => setStorageStatus('Unknown'), 3000);
    }
  };

  const reloadApp = () => {
    if (isClient && typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const checkStorage = () => {
    if (!isClient) return;
    
    try {
      if (typeof window !== 'undefined' && localStorage && sessionStorage) {
        const localStorageSize = JSON.stringify(localStorage).length;
        const sessionStorageSize = JSON.stringify(sessionStorage).length;
        setStorageStatus(`Local: ${localStorageSize} chars, Session: ${sessionStorageSize} chars`);
      } else {
        setStorageStatus('Storage not available');
      }
    } catch (error) {
      setStorageStatus('Error checking storage');
    }
  };

  const checkCache = async () => {
    if (!isClient) return;
    
    try {
      if (typeof window !== 'undefined' && 'caches' in window) {
        const cacheNames = await caches.keys();
        setCacheStatus(`${cacheNames.length} cache(s) found`);
      } else {
        setCacheStatus('Cache API not available');
      }
    } catch (error) {
      setCacheStatus('Error checking cache');
    }
  };

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="debug-container">
        <div className="debug-header">
          <h1>🔧 Debug Tools</h1>
        </div>
        <div className="debug-content">
          <div className="debug-section">
            <h2>Loading...</h2>
            <p>Please wait while the debug tools initialize...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="debug-container">
      <div className="debug-header">
        <h1>🔧 Debug Tools</h1>
      </div>

      <div className="debug-content">
        <div className="debug-section">
          <h2>Performance Metrics</h2>
          <div className="debug-metrics">
            <div className="metric-item">
              <span className="metric-label">Load Time:</span>
              <span className="metric-value">{performanceMetrics.loadTime || 'N/A'}ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">DOM Ready:</span>
              <span className="metric-value">{performanceMetrics.domContentLoaded || 'N/A'}ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">First Paint:</span>
              <span className="metric-value">{performanceMetrics.firstPaint || 'N/A'}ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Total Time:</span>
              <span className="metric-value">{performanceMetrics.totalTime || 'N/A'}ms</span>
            </div>
          </div>
        </div>

        <div className="debug-section">
          <h2>Cache Management</h2>
          <div className="debug-buttons">
            <button onClick={clearCache} className="debug-btn primary">
              <i className="fas fa-trash"></i>
              Clear All Cache
            </button>
            <button onClick={checkCache} className="debug-btn secondary">
              <i className="fas fa-search"></i>
              Check Cache Status
            </button>
          </div>
          <div className="debug-status">
            <span className="status-label">Cache Status:</span>
            <span className="status-value">{cacheStatus}</span>
          </div>
        </div>

        <div className="debug-section">
          <h2>Storage Management</h2>
          <div className="debug-buttons">
            <button onClick={clearStorage} className="debug-btn primary">
              <i className="fas fa-database"></i>
              Clear Storage
            </button>
            <button onClick={checkStorage} className="debug-btn secondary">
              <i className="fas fa-info-circle"></i>
              Check Storage
            </button>
          </div>
          <div className="debug-status">
            <span className="status-label">Storage Status:</span>
            <span className="status-value">{storageStatus}</span>
          </div>
        </div>

        <div className="debug-section">
          <h2>System Actions</h2>
          <div className="debug-buttons">
            <button onClick={reloadApp} className="debug-btn warning">
              <i className="fas fa-redo"></i>
              Reload Application
            </button>
          </div>
        </div>

        <div className="debug-section">
          <h2>System Information</h2>
          <div className="debug-info">
            <div className="info-item">
              <span className="info-label">User Agent:</span>
              <span className="info-value">{isClient && typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Platform:</span>
              <span className="info-value">{isClient && typeof navigator !== 'undefined' ? navigator.platform : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Language:</span>
              <span className="info-value">{isClient && typeof navigator !== 'undefined' ? navigator.language : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Online:</span>
              <span className="info-value">{isClient && typeof navigator !== 'undefined' ? (navigator.onLine ? 'Yes' : 'No') : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Screen Size:</span>
              <span className="info-value">{isClient && typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Viewport:</span>
              <span className="info-value">{isClient && typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug;


