import React, { useState, useEffect, useRef } from 'react';

interface FPSCounterProps {
  isVisible: boolean;
  onClose: () => void;
}

const FPSCounter: React.FC<FPSCounterProps> = ({ isVisible, onClose }) => {
  const [fps, setFps] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [minFps, setMinFps] = useState(60);
  const [maxFps, setMaxFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsHistory = useRef<number[]>([]);
  const animationId = useRef<number>();

  useEffect(() => {
    if (!isVisible) {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      return;
    }

    const calculateFPS = (currentTime: number) => {
      frameCount.current++;
      
      if (currentTime >= lastTime.current + 1000) {
        const currentFps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        
        setFps(currentFps);
        
        // Update FPS history for average calculation
        fpsHistory.current.push(currentFps);
        if (fpsHistory.current.length > 60) { // Keep last 60 seconds
          fpsHistory.current.shift();
        }
        
        // Calculate average FPS
        const avg = Math.round(fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length);
        setAvgFps(avg);
        
        // Update min/max FPS
        setMinFps(prev => Math.min(prev, currentFps));
        setMaxFps(prev => Math.max(prev, currentFps));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId.current = requestAnimationFrame(calculateFPS);
    };

    animationId.current = requestAnimationFrame(calculateFPS);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return '#4ade80'; // Green - Good
    if (fps >= 45) return '#fbbf24'; // Yellow - Fair
    if (fps >= 30) return '#f97316'; // Orange - Poor
    return '#ef4444'; // Red - Bad
  };

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return 'Excellent';
    if (fps >= 45) return 'Good';
    if (fps >= 30) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="fps-counter">
      <div className="fps-header">
        <span className="fps-title">FPS Monitor</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="fps-status" style={{ color: getFpsColor(fps) }}>
            {getPerformanceStatus(fps)}
          </span>
          <button 
            className="fps-close-btn" 
            onClick={onClose}
            title="Close FPS Monitor"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="fps-metrics">
        <div className="fps-metric">
          <span className="fps-label">Current:</span>
          <span className="fps-value" style={{ color: getFpsColor(fps) }}>
            {fps} FPS
          </span>
        </div>
        
        <div className="fps-metric">
          <span className="fps-label">Average:</span>
          <span className="fps-value" style={{ color: getFpsColor(avgFps) }}>
            {avgFps} FPS
          </span>
        </div>
        
        <div className="fps-metric">
          <span className="fps-label">Min:</span>
          <span className="fps-value" style={{ color: getFpsColor(minFps) }}>
            {minFps} FPS
          </span>
        </div>
        
        <div className="fps-metric">
          <span className="fps-label">Max:</span>
          <span className="fps-value" style={{ color: getFpsColor(maxFps) }}>
            {maxFps} FPS
          </span>
        </div>
      </div>
      
      <div className="fps-info">
        <small>Press Ctrl+Alt+F to toggle</small>
      </div>
    </div>
  );
};

export default FPSCounter;
