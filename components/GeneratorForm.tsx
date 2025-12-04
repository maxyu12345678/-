import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export const TOPIC_OPTIONS = {
    intro: '芳療基礎入門',
    schools: '芳療歷史與派別',
    extraction: '精油萃取與品質辨識',
    oils_basic: '5款必備基礎精油介紹',
    oils_advanced: '進階精油應用 (特定主題)',
    acupressure: '中醫經絡與穴位理論',
    practice_massage: '手部與頭部按摩實作',
    application_home: '情境應用：居家芳療',
    application_work: '情境應用：職場芳療',
    safety: '安全須知與禁忌',
};

interface GeneratorFormProps {
    audience: string;
    setAudience: (value: string) => void;
    duration: string;
    setDuration: (value: string) => void;
    topics: string[];
    handleTopicChange: (topic: string) => void;
    handleGenerate: () => void;
    isLoading: boolean;
    isGenerated: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({
    audience,
    setAudience,
    duration,
    setDuration,
    topics,
    handleTopicChange,
    handleGenerate,
    isLoading,
    isGenerated,
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-slate-200 space-y-6">
            <h2 className="text-xl font-bold text-slate-700 flex items-center">
                <i className="fa-solid fa-sliders mr-3 text-teal-500"></i>
                客製化您的簡報大綱
            </h2>
            
            <div>
                <label htmlFor="audience" className="block text-sm font-medium text-slate-600 mb-1">
                    1. 簡報對象
                </label>
                <input
                    type="text"
                    id="audience"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="例如：醫院護理師、社區長者"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            </div>

            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-slate-600 mb-1">
                    2. 簡報時間
                </label>
                <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition bg-white"
                >
                    <option>30分鐘</option>
                    <option>1小時</option>
                    <option>1.5小時</option>
                    <option>2小時</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                    3. 內容模組 (可複選)
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {Object.entries(TOPIC_OPTIONS).map(([key, label]) => (
                         <label key={key} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-md hover:bg-teal-50 transition cursor-pointer border border-slate-200">
                            <input
                                type="checkbox"
                                checked={topics.includes(label)}
                                onChange={() => handleTopicChange(label)}
                                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-slate-700 font-medium">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

             <div className="pt-2">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner />
                            <span className="ml-2">產生中...</span>
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-wand-magic-sparkles mr-3 transition-transform duration-300 group-hover:rotate-12"></i>
                            <span>{isGenerated ? '重新產生大綱' : '產生投影片大綱'}</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default GeneratorForm;
