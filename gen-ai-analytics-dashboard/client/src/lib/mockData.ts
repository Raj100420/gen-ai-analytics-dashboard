import { ChartData } from '@/types';

// This generates mock chart data for visualization
export const generateMockData = (): ChartData => {
  return {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Sales (in thousands $)',
        data: [850, 910, 1200],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.7)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(59, 130, 246, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
};
