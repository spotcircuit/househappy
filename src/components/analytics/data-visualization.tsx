'use client';

import { useState } from 'react';

interface DataPoint {
  month: string;
  value: number;
}

interface ChartData {
  label: string;
  data: DataPoint[];
  color: string;
}

export default function DataVisualization() {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'circumvention' | 'response_time'>('revenue');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '1y'>('6m');
  
  // Sample data for different metrics
  const chartData: Record<string, ChartData> = {
    revenue: {
      label: 'Platform Revenue',
      color: 'bg-blue-500',
      data: [
        { month: 'Nov', value: 42000 },
        { month: 'Dec', value: 45000 },
        { month: 'Jan', value: 48000 },
        { month: 'Feb', value: 51000 },
        { month: 'Mar', value: 57000 },
        { month: 'Apr', value: 65000 },
      ]
    },
    circumvention: {
      label: 'Circumvention Attempts',
      color: 'bg-red-500',
      data: [
        { month: 'Nov', value: 124 },
        { month: 'Dec', value: 118 },
        { month: 'Jan', value: 95 },
        { month: 'Feb', value: 72 },
        { month: 'Mar', value: 58 },
        { month: 'Apr', value: 32 },
      ]
    },
    response_time: {
      label: 'Avg. Response Time (hours)',
      color: 'bg-green-500',
      data: [
        { month: 'Nov', value: 5.2 },
        { month: 'Dec', value: 4.8 },
        { month: 'Jan', value: 4.1 },
        { month: 'Feb', value: 3.6 },
        { month: 'Mar', value: 3.2 },
        { month: 'Apr', value: 2.8 },
      ]
    }
  };
  
  // Get the active data
  const activeData = chartData[activeMetric];
  
  // Calculate the max value for scaling
  const maxValue = Math.max(...activeData.data.map(d => d.value));
  
  // Get data based on time range
  const getTimeRangeData = () => {
    switch (timeRange) {
      case '3m':
        return activeData.data.slice(-3);
      case '6m':
        return activeData.data;
      case '1y':
        // In a real app, we'd have 12 months of data
        return activeData.data;
    }
  };
  
  const displayData = getTimeRangeData();
  
  // Format value based on metric type
  const formatValue = (value: number) => {
    switch (activeMetric) {
      case 'revenue':
        return `$${value.toLocaleString()}`;
      case 'circumvention':
        return value.toString();
      case 'response_time':
        return `${value.toFixed(1)} hrs`;
    }
  };
  
  // Calculate percentage change
  const calculateChange = () => {
    const data = displayData;
    if (data.length < 2) return 0;
    
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    
    return ((lastValue - firstValue) / firstValue) * 100;
  };
  
  const percentChange = calculateChange();
  const isPositiveChange = activeMetric === 'revenue' ? percentChange > 0 : percentChange < 0;
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-blue-600 text-white p-4">
        <h3 className="font-medium">Platform Metrics Visualization</h3>
        <p className="text-sm text-blue-100">Interactive data visualization of key metrics</p>
      </div>
      
      <div className="p-6">
        {/* Metric selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveMetric('revenue')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeMetric === 'revenue' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveMetric('circumvention')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeMetric === 'circumvention' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Circumvention
          </button>
          <button
            onClick={() => setActiveMetric('response_time')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              activeMetric === 'response_time' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Response Time
          </button>
        </div>
        
        {/* Time range selector */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setTimeRange('3m')}
              className={`px-3 py-1 text-xs font-medium rounded-l-lg ${
                timeRange === '3m'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200`}
            >
              3 Months
            </button>
            <button
              onClick={() => setTimeRange('6m')}
              className={`px-3 py-1 text-xs font-medium ${
                timeRange === '6m'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border-t border-b border-gray-200`}
            >
              6 Months
            </button>
            <button
              onClick={() => setTimeRange('1y')}
              className={`px-3 py-1 text-xs font-medium rounded-r-lg ${
                timeRange === '1y'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200`}
            >
              1 Year
            </button>
          </div>
        </div>
        
        {/* Chart header */}
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">{activeData.label}</h4>
          <div className={`text-sm font-medium ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveChange ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}%
          </div>
        </div>
        
        {/* Chart */}
        <div className="h-64 flex items-end space-x-2">
          {displayData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full group">
                <div 
                  className={`w-full ${activeData.color} rounded-t`}
                  style={{ 
                    height: `${(point.value / maxValue) * 200}px`,
                    transition: 'height 0.5s ease-in-out'
                  }}
                ></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {formatValue(point.value)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{point.month}</div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">AI Impact Analysis</h4>
          <p className="text-xs text-gray-600">
            {activeMetric === 'revenue' && (
              <>
                Revenue has <span className="text-green-600 font-medium">increased by {Math.abs(percentChange).toFixed(1)}%</span> since the implementation of AI features. 
                The most significant growth occurred after the deployment of the message monitoring system in February, which reduced platform circumvention.
              </>
            )}
            {activeMetric === 'circumvention' && (
              <>
                Circumvention attempts have <span className="text-green-600 font-medium">decreased by {Math.abs(percentChange).toFixed(1)}%</span> since implementing 
                the AI detection system. The most significant drop occurred in February when we enhanced the detection algorithms with more subtle pattern recognition.
              </>
            )}
            {activeMetric === 'response_time' && (
              <>
                Average response time has <span className="text-green-600 font-medium">improved by {Math.abs(percentChange).toFixed(1)}%</span>, decreasing from 
                5.2 hours to 2.8 hours. The AI communication assistant has significantly reduced the time service providers take to respond to inquiries.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
