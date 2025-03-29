import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import Layout from '@/components/Layout';
import QueryInput from '@/components/QueryInput';
import QueryProcessing from '@/components/QueryProcessing';
import QueryError from '@/components/QueryError';
import QueryResult from '@/components/QueryResult';
import QuickStats from '@/components/QuickStats';
import RecentActivity from '@/components/RecentActivity';

export default function Dashboard() {
  const { currentQuery, isProcessing, error, results } = useSelector((state: RootState) => state.query);
  
  // Get the most recent result (if any)
  const resultIds = Object.keys(results);
  const latestResult = resultIds.length > 0 ? results[resultIds[0]] : null;

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">AI-Powered Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Ask questions about your business data to get instant insights</p>
      </div>
      
      {/* Query Input */}
      <QueryInput />
      
      {/* Query Processing State */}
      {isProcessing && <QueryProcessing query={currentQuery} />}
      
      {/* Error State */}
      {!isProcessing && error && (
        <QueryError 
          message={error} 
          onTryAgain={() => {}} 
        />
      )}
      
      {/* Query Result */}
      {!isProcessing && !error && latestResult && (
        <QueryResult result={latestResult} />
      )}
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickStats />
        <RecentActivity />
      </div>
    </Layout>
  );
}
