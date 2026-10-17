import React, { useState, useEffect } from 'react';
import { ExternalKnowledgeService, ExternalArticle } from '../../services/externalKnowledgeService';
import { soundEngine } from '../../services/soundEngine';
import { Globe, Search, BookOpen, ExternalLink, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface ExternalKnowledgeExplorerProps {
  initialTopic?: string;
  suggestedTopics?: string[];
  onClose?: () => void;
}

export const ExternalKnowledgeExplorer: React.FC<ExternalKnowledgeExplorerProps> = ({
  initialTopic = 'Gas exchange',
  suggestedTopics = ['Gas exchange', 'Alveolus', 'Ohm\'s law', 'Chemical equilibrium', 'Quadratic equation', 'Mitosis', 'DNA'],
  onClose,
}) => {
  const [query, setQuery] = useState<string>(initialTopic);
  const [loading, setLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ExternalArticle | null>(null);

  const performSearch = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    soundEngine.playPop();
    try {
      const result = await ExternalKnowledgeService.fetchTopicSummary(term);
      setArticle(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialTopic);
  }, [initialTopic]);

  return (
    <div className="pearl-card p-5 bg-white border border-slate-200 shadow-xl rounded-2xl max-w-2xl mx-auto my-4">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
            <Globe size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
              Live Encyclopedia &amp; Textbook Knowledge Explorer
            </h4>
            <p className="text-[11px] text-slate-500">
              Live Academic &amp; Scientific Reference via Wikimedia &amp; KPTBB Archives
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={() => {
              soundEngine.playPop();
              onClose();
            }}
            className="text-xs px-2.5 py-1 rounded-lg text-slate-500 hover:text-slate-800 bg-slate-100 font-bold"
          >
            Close
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') performSearch(query);
            }}
            placeholder="Search any textbook topic (e.g. Alveoli, Ohm's Law, Mitosis)..."
            className="w-full text-xs font-medium pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-purple-500 bg-slate-50 focus:bg-white transition"
          />
          <Search size={14} className="absolute left-2.5 top-3 text-slate-400" />
        </div>
        <button
          onClick={() => performSearch(query)}
          disabled={loading}
          className="pearl-btn pearl-btn-lavender text-xs px-4 py-2 font-bold flex items-center gap-1 shrink-0"
        >
          {loading ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
          Explore
        </button>
      </div>

      {/* Quick Suggested Topics Pills */}
      {suggestedTopics && suggestedTopics.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" /> Explore Topic:
          </span>
          {suggestedTopics.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(item);
                performSearch(item);
              }}
              className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 shrink-0 transition"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* Result Display */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400 text-xs">
          <Loader2 size={24} className="animate-spin text-purple-600 mb-2" />
          <span>Fetching comprehensive academic knowledge...</span>
        </div>
      ) : article ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
            {article.thumbnailUrl && (
              <div className="w-full sm:w-44 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-white">
                <img
                  src={article.thumbnailUrl}
                  alt={article.title}
                  className="w-full h-32 object-contain p-1"
                />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Verified Encyclopedia Concept
                </span>
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Wikipedia Article <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <h3 className="text-base font-extrabold text-slate-900">{article.title}</h3>
              {article.description && (
                <p className="text-xs font-semibold text-purple-700">{article.description}</p>
              )}
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {article.extract}
              </p>
            </div>
          </div>

          {/* Key Academic Facts */}
          {article.keyFacts && article.keyFacts.length > 0 && (
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 space-y-1.5">
              <h5 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <BookOpen size={13} className="text-amber-600" /> High-Yield Scientific Highlights:
              </h5>
              <div className="space-y-1">
                {article.keyFacts.map((fact, fIdx) => (
                  <div key={fIdx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                    <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
