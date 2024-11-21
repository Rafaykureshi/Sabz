import { useEffect, useRef } from 'react';
import { performanceService } from '../services/performanceService';

export const usePerformance = (operationName: string) => {
  const startTime = useRef(performance.now());

  useEffect(() => {
    return () => {
      const duration = performance.now() - startTime.current;
      performanceService.logMetric({
        type: 'render',
        operation: operationName,
        duration
      });
    };
  }, [operationName]);
};