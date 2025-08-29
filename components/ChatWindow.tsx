
import React, { useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import { Message } from './Message';
import { BotIcon } from './icons/BotIcon';

interface ChatWindowProps {
    messages: MessageType[];
    isLoading: boolean;
    sourceProvided: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, sourceProvided }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && sourceProvided && (
                <div className="text-center text-brand-text-secondary p-8 flex flex-col items-center">
                    <BotIcon className="w-12 h-12 mb-4 text-brand-primary" />
                    <h3 className="text-xl font-semibold text-brand-text-primary">Chat Ready</h3>
                    <p>Your source is loaded. Ask a question to begin.</p>
                </div>
            )}
            {messages.map((msg, index) => (
                <Message key={index} message={msg} />
            ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                 <div className="flex items-start gap-4 p-4 bg-brand-surface/50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-brand-primary">
                        <BotIcon className="w-5 h-5 text-brand-bg" />
                    </div>
                    <div className="flex-1 pt-1">
                        <p className="font-semibold text-brand-text-primary mb-1">NotebookLM Assistant</p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse delay-75"></span>
                            <span className="w-2 h-2 bg-brand-text-secondary rounded-full animate-pulse delay-150"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
