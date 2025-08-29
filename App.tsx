
import React, { useState, useCallback, useMemo } from 'react';
import type { Chat } from "@google/genai";
import { SourceInfo } from './components/SourceInfo';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { Role, Message } from './types';
import { createNotebookChatSession } from './services/geminiService';
import { SOURCE_TEXT } from './data/sourceText';

const App: React.FC = () => {
    const [sourceText] = useState<string>(SOURCE_TEXT);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const chatSession = useMemo<Chat | null>(() => {
        if (sourceText.trim()) {
            return createNotebookChatSession(sourceText);
        }
        return null;
    }, [sourceText]);

    const handleSendMessage = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim() || !chatSession || isLoading) return;

        const userMessage: Message = { role: Role.USER, content: currentMessage.trim() };
        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatSession.sendMessageStream({ message: userMessage.content });

            let modelResponse = '';
            setMessages(prev => [...prev, { role: Role.MODEL, content: '' }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = modelResponse;
                    return newMessages;
                });
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Failed to get response: ${errorMessage}`);
            setMessages(prev => [...prev, { role: Role.MODEL, content: `Sorry, I encountered an error. ${errorMessage}` }]);
        } finally {
            setIsLoading(false);
        }
    }, [chatSession, currentMessage, isLoading]);

    return (
        <div className="h-screen w-screen flex flex-col p-4 gap-4 bg-brand-bg">
            <header className="text-center">
                <h1 className="text-2xl font-bold text-brand-text-primary">금연사업 지침 문의 Chatbot</h1>
                <p className="text-brand-text-secondary">AI assistant for "2024 Smoking Cessation Guide" and "System User Manual"</p>
            </header>
            
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
                {/* Source Information Column */}
                <div className="flex flex-col min-h-0">
                    <SourceInfo />
                </div>
                
                {/* Chat Column */}
                <div className="flex flex-col h-full bg-brand-surface rounded-lg min-h-0">
                    <div className="flex-1 flex flex-col min-h-0">
                      <h2 className="text-lg font-semibold text-brand-primary p-4 border-b border-brand-secondary">질문하기</h2>
                        <>
                           {error && <div className="p-4 bg-red-900/50 text-red-300 border-b border-red-700">{error}</div>}
                           <ChatWindow messages={messages} isLoading={isLoading} sourceProvided={!!chatSession} />
                           <MessageInput
                                currentMessage={currentMessage}
                                setCurrentMessage={setCurrentMessage}
                                onSendMessage={handleSendMessage}
                                isLoading={isLoading}
                                disabled={!chatSession}
                            />
                        </>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
