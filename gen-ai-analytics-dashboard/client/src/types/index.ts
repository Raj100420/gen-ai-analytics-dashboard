export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface QueryResult {
  id: string;
  query: string;
  timestamp: number;
  title: string;
  description: string;
  chartData: ChartData;
  chartType: 'bar' | 'line' | 'pie' | 'table';
}
