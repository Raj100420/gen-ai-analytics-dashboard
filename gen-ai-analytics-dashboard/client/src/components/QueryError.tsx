import { useDispatch } from 'react-redux';
import { clearCurrentQuery } from '@/store/querySlice';

interface QueryErrorProps {
  message: string;
  onTryAgain: () => void;
}

export default function QueryError({ message, onTryAgain }: QueryErrorProps) {
  const dispatch = useDispatch();

  const handleTryAgain = () => {
    dispatch(clearCurrentQuery());
    onTryAgain();
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-red-200 p-6 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Unable to process your query</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message || "I couldn't understand what you're asking or access the necessary data. Please try rephrasing your question or check if the data source is available."}</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="text-sm font-medium text-red-600 hover:text-red-500"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
