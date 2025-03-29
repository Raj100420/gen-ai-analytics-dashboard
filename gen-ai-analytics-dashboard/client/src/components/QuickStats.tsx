export default function QuickStats() {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-medium text-slate-900">Quick Stats</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Total Queries</h3>
            <p className="mt-1 text-3xl font-semibold text-slate-900">1,248</p>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>12.5% from last month</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Active Users</h3>
            <p className="mt-1 text-3xl font-semibold text-slate-900">864</p>
            <div className="mt-1 flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>8.2% from last month</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Data Sources</h3>
            <p className="mt-1 text-3xl font-semibold text-slate-900">12</p>
            <div className="mt-1 flex items-center text-xs text-slate-500">
              <span>Last added: 3 days ago</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Saved Insights</h3>
            <p className="mt-1 text-3xl font-semibold text-slate-900">37</p>
            <div className="mt-1 flex items-center text-xs text-slate-500">
              <span>48 shared with team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
