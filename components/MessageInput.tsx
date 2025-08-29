
import React from 'react';
import { SendIcon } from './icons/SendIcon';

interface MessageInputProps {
    currentMessage: string;
    setCurrentMessage: (message: string) => void;
    onSendMessage: (e: React.FormEvent) => void;
    isLoading: boolean;
    disabled: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ currentMessage, setCurrentMessage, onSendMessage, isLoading, disabled }) => {
    const isInputDisabled = isLoading || disabled;

    return (
        <form onSubmit={onSendMessage} className="p-4 bg-brand-surface">
            <div className="relative">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder={disabled ? "Please provide source material first" : "Ask a question about your source..."}
                    disabled={isInputDisabled}
                    className="w-full bg-brand-bg border border-brand-secondary rounded-full py-3 pl-4 pr-12 text-brand-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={isInputDisabled || !currentMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-brand-primary hover:bg-brand-primary/20 disabled:text-brand-secondary disabled:hover:bg-transparent transition-colors"
                >
                    <SendIcon className="w-6 h-6" />
                </button>
            </div>
        </form>
    );
};
