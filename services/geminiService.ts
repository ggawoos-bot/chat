
import { GoogleGenAI, Chat } from "@google/genai";
import { Role, Message } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION_TEMPLATE = `You are an expert assistant. Your name is NotebookLM Assistant. 
You must answer questions based ONLY on the following source material provided. 
Do not use any external knowledge or your pre-trained knowledge. 
If the answer cannot be found in the source material, you must state that the information is not available in the provided context. 
Be concise, helpful, and cite which part of the source you are referring to if possible.

Here is the source material:
---START OF SOURCE---
{sourceText}
---END OF SOURCE---`;

export function createNotebookChatSession(sourceText: string): Chat {
    const systemInstruction = SYSTEM_INSTRUCTION_TEMPLATE.replace('{sourceText}', sourceText);

    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
        },
        history: [],
    });
    return chat;
}
