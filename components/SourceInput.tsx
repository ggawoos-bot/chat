
import React from 'react';

interface SourceInputProps {
    sourceText: string;
    setSourceText: (text: string) => void;
    isLoading: boolean;
}

export const SourceInput: React.FC<SourceInputProps> = ({ sourceText, setSourceText, isLoading }) => {
    return (
        <div className="flex flex-col h-full bg-brand-surface rounded-lg p-4">
            <h2 className="text-lg font-semibold text-brand-primary mb-3">1. Add Source Material</h2>
            <p className="text-sm text-brand-text-secondary mb-4">
                Paste any text-based content below. The chatbot will use this as its sole source of knowledge to answer your questions.
            </p>
            <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste your document, article, or notes here..."
                disabled={isLoading}
                className="w-full flex-grow bg-brand-bg border border-brand-secondary rounded-md p-3 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none disabled:opacity-50"
            />
        </div>
    );
};
