export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'query',
      title: 'Query Analyzed',
      time: 'Just now',
      details: '"Show monthly sales for Q1 2023"',
      iconBg: 'bg-primary-50',
      iconColor: 'text-primary-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 2,
      type: 'user',
      title: 'Sarah Chen',
      time: '2 hours ago',
      details: 'Added a new data source: <span class="font-medium">Customer Feedback DB</span>',
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      id: 3,
      type: 'insight',
      title: 'Insight Saved',
      time: '5 hours ago',
      details: '"Customer acquisition cost by channel"',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-medium text-slate-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, idx) => (
              <li key={activity.id}>
                <div className={`relative pb-8 ${idx !== activities.length - 1 ? '' : ''}`}>
                  {idx !== activities.length - 1 && (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className={`h-10 w-10 rounded-full ${activity.iconBg} flex items-center justify-center ring-8 ring-white ${activity.iconColor}`}>
                        {activity.icon}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{activity.title}</div>
                        <p className="mt-0.5 text-sm text-slate-500">{activity.time}</p>
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        <p dangerouslySetInnerHTML={{ __html: activity.details }}></p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
