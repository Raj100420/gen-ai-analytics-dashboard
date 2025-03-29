import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCurrentQuery, clearCurrentQuery, processQuery } from '@/store/querySlice';
import { toggleSuggestions } from '@/store/uiSlice';
import { useQuerySuggestions } from '@/hooks/useQuerySuggestions';

export default function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery } = useSelector((state: RootState) => state.query);
  const { showSuggestions } = useSelector((state: RootState) => state.ui);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputFocused, setInputFocused] = useState(false);

  // Get AI query suggestions based on current input
  const suggestions = useQuerySuggestions(currentQuery);

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const query = e.target.value;
    dispatch(setCurrentQuery(query));
    
    // Show suggestions after typing a few characters
    if (query.length > 2 && !showSuggestions) {
      dispatch(toggleSuggestions(true));
    } else if (query.length <= 2 && showSuggestions) {
      dispatch(toggleSuggestions(false));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitQuery();
    }
  };

  const handleSubmitQuery = () => {
    if (currentQuery.trim()) {
      dispatch(processQuery(currentQuery.trim()));
      dispatch(toggleSuggestions(false));
    }
  };

  const handleClearQuery = () => {
    dispatch(clearCurrentQuery());
    dispatch(toggleSuggestions(false));
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setCurrentQuery(suggestion));
    dispatch(toggleSuggestions(false));
  };

  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-slate-200 overflow-hidden mb-6">
      <div className="p-4">
        <div className="relative">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-primary-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.18.066c.374.136.75.261 1.128.372m0 0a11.25 11.25 0 01-5.63-2.576m0 0a11.24 11.24 0 01-2.998 2.222M3.75 3.75l2.25 2.25" />
              </svg>
            </div>
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                rows={2}
                placeholder="Ask a question about your data..."
                className={`block w-full px-0 py-2 text-slate-900 placeholder:text-slate-400 border-0 resize-none focus:ring-0 sm:text-sm sm:leading-6 ${inputFocused ? 'outline-none' : ''}`}
                value={currentQuery}
                onChange={handleQueryChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />

              {/* AI Suggestions (appears when typing) */}
              {showSuggestions && (
                <div className="mt-1">
                  <p className="text-xs font-medium text-slate-500">Suggestions:</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Query Actions */}
      <div className="bg-slate-50 py-3 px-4 flex justify-between items-center border-t border-slate-200">
        <div className="text-xs text-slate-500">
          <span>Press Enter to ask, Shift+Enter for new line</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleClearQuery}
            className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Clear
          </button>
          <button
            onClick={handleSubmitQuery}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}
