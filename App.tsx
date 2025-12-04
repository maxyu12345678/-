import React, { useState, useCallback } from 'react';
import { generateAromatherapyOutline } from './services/geminiService';
import Header from './components/Header';
import OutlineDisplay from './components/OutlineDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import GeneratorForm, { TOPIC_OPTIONS } from './components/GeneratorForm';

const App: React.FC = () => {
  // Form State
  const [audience, setAudience] = useState<string>('醫院的護理師');
  const [duration, setDuration] = useState<string>('1小時');
  const [topics, setTopics] = useState<string[]>(() => [
    TOPIC_OPTIONS['intro'],
    TOPIC_OPTIONS['schools'],
    TOPIC_OPTIONS['oils_basic'],
    TOPIC_OPTIONS['acupressure'],
    TOPIC_OPTIONS['application_work'],
    TOPIC_OPTIONS['safety'],
  ]);

  // App State
  const [outline, setOutline] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleGenerate = useCallback(async () => {
    if (topics.length === 0) {
      setError('請至少選擇一個內容模組。');
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutline('');
    setIsGenerated(false);
    try {
      const result = await generateAromatherapyOutline(audience, duration, topics);
      setOutline(result);
      setIsGenerated(true);
    } catch (err) {
      setError('無法產生大綱，請稍後再試。');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [audience, duration, topics]);

  const handleTopicChange = (topic: string) => {
    setTopics(prevTopics =>
      prevTopics.includes(topic)
        ? prevTopics.filter(t => t !== topic)
        : [...prevTopics, topic]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-teal-50 to-indigo-50 text-slate-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <GeneratorForm
              audience={audience}
              setAudience={setAudience}
              duration={duration}
              setDuration={setDuration}
              topics={topics}
              handleTopicChange={handleTopicChange}
              handleGenerate={handleGenerate}
              isLoading={isLoading}
              isGenerated={isGenerated}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 border border-slate-200 min-h-[60vh] flex flex-col justify-center">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                   <LoadingSpinner isPageLoader={true} />
                   <h3 className="text-xl font-semibold text-slate-600 mt-4">AI 正在為您客製化大綱...</h3>
                   <p className="text-slate-500 mt-1">請稍候片刻。</p>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center h-full">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
                    <strong className="font-bold">發生錯誤：</strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                </div>
              )}

              {isGenerated && !isLoading && <OutlineDisplay content={outline} />}
              
              {!isGenerated && !isLoading && !error && (
                 <div className="flex flex-col items-center justify-center h-full text-center py-12 px-6 bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-300">
                    <i className="fa-solid fa-file-invoice text-5xl text-teal-400 mb-4"></i>
                    <h3 className="text-xl font-semibold text-slate-600">準備好開始了嗎？</h3>
                    <p className="text-slate-500 mt-1 max-w-sm">請在左側設定您的簡報條件，AI 將為您草擬一份專業的客製化大綱。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-400">
        <p>由 Gemini API 強力驅動</p>
      </footer>
    </div>
  );
};

export default App;
