
import React from 'react';

export const SourceInfo: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-brand-surface rounded-lg p-4">
            <h2 className="text-lg font-semibold text-brand-primary mb-3">자료 출처</h2>
            <p className="text-sm text-brand-text-secondary mb-4">
                This chatbot answers questions based on the following pre-loaded documents:
            </p>
            <ul className="list-disc list-inside text-brand-text-primary space-y-2">
                <li>2024년 지역사회 통합건강증진사업 안내 (금연)</li>
                <li>금연서비스 통합정보시스템 사용자매뉴얼</li>
            </ul>
        </div>
    );
};
