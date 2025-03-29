export default function QueryProcessing({ query }: { query: string }) {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-6 mb-6">
      <div className="flex flex-col items-center justify-center py-6">
        <div className="animate-pulse mb-4">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <svg 
              className="animate-spin h-6 w-6 text-primary-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">Analyzing your query...</h3>
        <p className="text-slate-500 text-sm mb-4 text-center max-w-md">
          I'm searching through your data sources and building insights based on "{query}"
        </p>
        <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-in-out" 
            style={{ width: '70%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
