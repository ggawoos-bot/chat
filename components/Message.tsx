
import React from 'react';
import { Role, Message as MessageType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';

interface MessageProps {
    message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
    const isUser = message.role === Role.USER;

    return (
        <div className={`flex items-start gap-4 p-4 ${isUser ? '' : 'bg-brand-surface/50 rounded-lg'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-brand-secondary' : 'bg-brand-primary'}`}>
                {isUser ? <UserIcon className="w-5 h-5 text-brand-text-primary" /> : <BotIcon className="w-5 h-5 text-brand-bg" />}
            </div>
            <div className="flex-1 pt-1">
                <p className="font-semibold text-brand-text-primary mb-1">{isUser ? 'You' : 'Assistant'}</p>
                <p className="text-brand-text-secondary whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
};
