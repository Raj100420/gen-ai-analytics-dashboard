import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentQuery, processQuery } from '@/store/querySlice';
import { formatDistanceToNow } from 'date-fns';

export default function QueryHistory() {
  const dispatch = useDispatch();
  const { queryHistory } = useSelector((state: RootState) => state.query);

  const handleQueryClick = (query: string) => {
    dispatch(setCurrentQuery(query));
    dispatch(processQuery(query));
  };

  const formatTime = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="mt-2 space-y-2">
      {queryHistory.map((query) => (
        <button
          key={query.id}
          onClick={() => handleQueryClick(query.text)}
          className="w-full text-left px-2 py-2 text-sm rounded-md hover:bg-slate-100 transition-colors"
        >
          <div className="text-sm font-medium text-slate-700 truncate">{query.text}</div>
          <div className="text-xs text-slate-500">{formatTime(query.timestamp)}</div>
        </button>
      ))}
    </div>
  );
}
