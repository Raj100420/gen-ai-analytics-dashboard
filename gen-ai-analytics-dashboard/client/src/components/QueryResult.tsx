import { useState, useEffect, useRef } from 'react';
import { Chart, registerables, ChartType } from 'chart.js';
import { useDispatch } from 'react-redux';
import { setChartType } from '@/store/querySlice';
import { QueryResult as QueryResultType } from '@/types';

Chart.register(...registerables);

interface QueryResultProps {
  result: QueryResultType;
}

export default function QueryResult({ result }: QueryResultProps) {
  const dispatch = useDispatch();
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize and update chart when result changes
  useEffect(() => {
    if (!chartRef.current || result.chartType === 'table') return;

    // Destroy existing chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Create a deep clone of the chart data to avoid modifying the original object
    const chartData = {
      labels: [...result.chartData.labels],
      datasets: result.chartData.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: [...dataset.backgroundColor],
        borderColor: [...dataset.borderColor],
        data: [...dataset.data]
      }))
    };

    // Convert the chartType to a valid Chart.js type
    // Only use 'bar', 'line', or 'pie' as valid ChartType values
    const chartTypeValue = (result.chartType === 'bar' || result.chartType === 'line' || result.chartType === 'pie') 
      ? result.chartType as ChartType
      : 'bar' as ChartType;

    const newChartInstance = new Chart(ctx, {
      type: chartTypeValue,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: result.title || 'Query Results'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value + 'K';
              }
            }
          }
        }
      }
    });

    setChartInstance(newChartInstance);

    // Cleanup function to destroy chart on unmount
    return () => {
      newChartInstance.destroy();
    };
  }, [result, result.chartType]);

  const handleChangeChartType = (type: 'bar' | 'line' | 'pie' | 'table') => {
    dispatch(setChartType({ queryId: result.id, chartType: type }));
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden mb-6">
      {/* Result Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-slate-900">
              {result.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {result.description}
            </p>
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-2.5 py-1.5 border border-slate-300 text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <button className="inline-flex items-center px-2.5 py-1.5 border border-slate-300 text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Save
            </button>
          </div>
        </div>
        
        {/* Chart Type Selector */}
        <div className="mt-4 flex items-center border-t border-slate-200 pt-4">
          <span className="text-xs font-medium text-slate-500 mr-3">Visualization:</span>
          <div className="flex space-x-1">
            <button 
              onClick={() => handleChangeChartType('bar')}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                result.chartType === 'bar' ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Bar
            </button>
            <button 
              onClick={() => handleChangeChartType('line')}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                result.chartType === 'line' ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Line
            </button>
            <button 
              onClick={() => handleChangeChartType('pie')}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                result.chartType === 'pie' ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Pie
            </button>
            <button 
              onClick={() => handleChangeChartType('table')}
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                result.chartType === 'table' ? 'bg-primary-100 text-primary-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Result Content */}
      <div className="p-6">
        {/* Chart Area or Table Area */}
        {result.chartType === 'table' ? (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {/* Header row with category names */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  {result.chartData.labels.map((label, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {/* Data rows */}
                {result.chartData.datasets.map((dataset, datasetIndex) => (
                  <tr key={datasetIndex} className={datasetIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {dataset.label}
                    </td>
                    {dataset.data.map((value, valueIndex) => (
                      <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        ${value}K
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-[350px] relative">
            <canvas ref={chartRef}></canvas>
          </div>
        )}

        {/* Key Insights */}
        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-medium text-slate-900 mb-3">Key Insights</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-900">Highest Sales Month</h4>
                  <p className="text-lg font-semibold text-slate-700">March ($1.2M)</p>
                  <p className="text-xs text-slate-500">32% increase from February</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-900">Average Monthly Sales</h4>
                  <p className="text-lg font-semibold text-slate-700">$983K</p>
                  <p className="text-xs text-slate-500">Across Q1 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-medium text-slate-900">Q1 Growth Rate</h4>
                  <p className="text-lg font-semibold text-slate-700">24%</p>
                  <p className="text-xs text-slate-500">Compared to Q4 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up Questions */}
        <div className="mt-6 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-medium text-slate-900 mb-3">Follow-up Questions</h3>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What caused the March spike?
            </button>
            <button className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Break down sales by product category
            </button>
            <button className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Compare to same period last year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
