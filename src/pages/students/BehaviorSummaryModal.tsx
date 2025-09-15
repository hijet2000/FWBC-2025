import React, { useState, useEffect } from 'react';

interface BehaviorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string;
  isLoading: boolean;
}

const BehaviorSummaryModal: React.FC<BehaviorSummaryModalProps> = ({ isOpen, onClose, summary, isLoading }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy to Clipboard');

  useEffect(() => {
    // Reset button text when modal is reopened or summary changes
    if (isOpen) {
      setCopyButtonText('Copy to Clipboard');
    }
  }, [isOpen, summary]);
  
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
    }, (err) => {
        console.error('Could not copy text: ', err);
        setCopyButtonText('Failed to Copy');
        setTimeout(() => setCopyButtonText('Copy to Clipboard'), 2000);
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-2xl text-white border border-gray-700 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">AI-Generated Behavior Summary</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors text-2xl font-bold leading-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        
        <div className="min-h-[200px] bg-gray-900/50 p-4 rounded-md border border-gray-600">
          {isLoading ? (
            <div className="flex items-center justify-center h-full flex-col text-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
              <p className="text-gray-300">Generating summary...</p>
              <p className="text-sm text-gray-500 mt-1">This may take a moment.</p>
            </div>
          ) : (
            <p className="text-gray-300 whitespace-pre-wrap">{summary}</p>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-md transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={isLoading || !summary}
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {copyButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BehaviorSummaryModal;
