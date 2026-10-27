import React, { useState, useRef, useEffect } from 'react';
import { LearnerProfile } from '../../types';
import { CeronAIService, AITutorResponse } from '../../services/ceronAIService';
import { soundEngine } from '../../services/soundEngine';
import {
  Sparkles,
  ArrowUp,
  Loader2,
  Copy,
  CheckCircle2,
  Calculator,
  X,
  Lightbulb,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  response?: AITutorResponse;
  timestamp: string;
}

interface CeronAIClaudeViewProps {
  profile: LearnerProfile;
  onExit: () => void;
}

export const CeronAIClaudeView: React.FC<CeronAIClaudeViewProps> = ({
  profile,
  onExit,
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const quickPills = [
    {
      label: "Newton's Second Law derivation",
      prompt: "State Newton's 2nd Law of Motion and derive the formula F = ma with standard SI units.",
    },
    {
      label: "Respiration vs Photosynthesis",
      prompt: "Differentiate between Respiration and Photosynthesis with 4 clear exam points.",
    },
    {
      label: "Quadratic Formula step-by-step",
      prompt: "Explain how to find the roots of a quadratic equation using the quadratic formula with an example.",
    },
    {
      label: "Boyle's Law & Gas equation",
      prompt: "Explain Boyle's Law with its mathematical formula, verification, and practical application.",
    },
  ];

  const handleSend = async (textToSend?: string) => {
    const questionText = textToSend || inputQuery;
    if (!questionText.trim() || isLoading) return;

    soundEngine.playPop();
    const userMsgId = Date.now().toString();
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: questionText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await CeronAIService.askTutor({
        question: questionText.trim(),
        chapterTitle: 'Academic Curriculum',
        subjectName: 'General Science & Mathematics',
        className: profile.className || 'Board Examinations',
      });

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: res.finalAnswerEn || 'Here is your structured solution:',
        response: res,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorAssistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'I encountered an issue preparing the response. Please check your connection and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorAssistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (msg: ChatMessage) => {
    if (!msg.response) return;
    const r = msg.response;
    const text = `${r.questionTitle}\n\n${r.stepByStepSolution.join('\n\n')}\n\nConclusion: ${r.finalAnswerEn}\n\nExaminer Note: ${r.examinerTip}`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col font-sans antialiased"
      style={{ backgroundColor: '#FAF9F5', color: '#1E1B18' }}
    >
      {/* ── Top Bar ── */}
      <header
        className="h-14 px-5 sm:px-8 flex items-center justify-between shrink-0"
        style={{ borderBottom: '1px solid #EAE5DC', backgroundColor: '#FAF9F5' }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: '#EFEAE1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Sparkles size={13} style={{ color: '#825E38' }} />
          </div>
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 600, fontSize: '17px', color: '#1E1B18' }}>
            Ceron AI
          </span>
        </div>

        <button
          onClick={onExit}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid #DCD7CE',
            backgroundColor: '#FFFFFF',
            color: '#4B463F',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
          title="Exit to Dashboard"
        >
          <span>Exit</span>
          <X size={13} />
        </button>
      </header>

      {/* ── Message Canvas ── */}
      <main className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div className="pt-16 sm:pt-24 pb-8 text-center space-y-5 animate-fadeIn">
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#EFEAE1',
                  border: '1px solid #E2DCD2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <Sparkles size={18} style={{ color: '#825E38' }} />
              </div>

              <div>
                <h1
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '28px',
                    fontWeight: 400,
                    color: '#1E1B18',
                    letterSpacing: '-0.02em',
                    margin: 0,
                  }}
                >
                  How can I help you today?
                </h1>
              </div>

              {/* Minimal Starter Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-3 max-w-lg mx-auto">
                {quickPills.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.prompt)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '20px',
                      border: '1px solid #E2DCD2',
                      backgroundColor: '#FFFFFF',
                      color: '#4A453E',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#BDB6A9';
                      e.currentTarget.style.color = '#1E1B18';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2DCD2';
                      e.currentTarget.style.color = '#4A453E';
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Stream */}
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.sender === 'user' ? (
                /* User Message */
                <div className="flex justify-end">
                  <div
                    style={{
                      maxWidth: '85%',
                      backgroundColor: '#262320',
                      color: '#FAF8F5',
                      borderRadius: '16px',
                      borderTopRightRadius: '4px',
                      padding: '10px 16px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, fontWeight: 400 }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ) : (
                /* Assistant Solution */
                <div className="flex gap-3 max-w-full">
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: '#EFEAE1',
                      border: '1px solid #E2DCD2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <Sparkles size={14} style={{ color: '#825E38' }} />
                  </div>

                  <div
                    style={{
                      flex: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E6E1D8',
                      padding: '16px 18px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: '1px solid #F0EBE3',
                        paddingBottom: '8px',
                        marginBottom: '12px',
                      }}
                    >
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#825E38' }}>
                        Model Answer
                      </span>
                      {msg.response && (
                        <button
                          onClick={() => handleCopy(msg)}
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#756F68',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                          }}
                        >
                          {copiedId === msg.id ? (
                            <>
                              <CheckCircle2 size={13} style={{ color: '#16A34A' }} />
                              <span style={{ color: '#16A34A', fontWeight: 600 }}>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {msg.response ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {msg.response.formula && (
                          <div
                            style={{
                              backgroundColor: '#F8F6F2',
                              border: '1px solid #EBE5DB',
                              borderRadius: '10px',
                              padding: '8px 12px',
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <Calculator size={14} style={{ color: '#825E38' }} />
                            <strong style={{ color: '#4B463F' }}>Formula:</strong>
                            <code style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2DCD2', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace', color: '#825E38', fontWeight: 700 }}>
                              {msg.response.formula}
                            </code>
                          </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {msg.response.stepByStepSolution.map((step, idx) => (
                            <div
                              key={idx}
                              style={{
                                backgroundColor: '#FAF9F6',
                                padding: '10px 12px',
                                borderRadius: '10px',
                                border: '1px solid #EDE8DF',
                                fontSize: '13px',
                                lineHeight: 1.6,
                                color: '#1E1B18',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px',
                              }}
                            >
                              <span
                                style={{
                                  width: '22px',
                                  height: '22px',
                                  borderRadius: '50%',
                                  backgroundColor: '#EFEAE1',
                                  color: '#5A544D',
                                  fontWeight: 700,
                                  fontSize: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '1px',
                                }}
                              >
                                {idx + 1}
                              </span>
                              <div style={{ flex: 1 }}>{step}</div>
                            </div>
                          ))}
                        </div>

                        {msg.response.finalAnswerEn && (
                          <div
                            style={{
                              backgroundColor: '#F3F8F4',
                              border: '1px solid #CFE2D4',
                              borderRadius: '10px',
                              padding: '10px 12px',
                              fontSize: '13px',
                              color: '#154826',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                            }}
                          >
                            <CheckCircle2 size={15} style={{ color: '#16A34A', flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <strong>Conclusion: </strong>
                              <span>{msg.response.finalAnswerEn}</span>
                            </div>
                          </div>
                        )}

                        {msg.response.finalAnswerUr && (
                          <div
                            style={{
                              backgroundColor: '#FAF9F6',
                              border: '1px solid #EDE8DF',
                              borderRadius: '10px',
                              padding: '10px 12px',
                              textAlign: 'right',
                              direction: 'rtl',
                            }}
                          >
                            <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.8, color: '#3A3631', fontWeight: 600 }}>
                              {msg.response.finalAnswerUr}
                            </p>
                          </div>
                        )}

                        {msg.response.examinerTip && (
                          <div
                            style={{
                              backgroundColor: '#FDF9F0',
                              border: '1px solid #F0E3C7',
                              borderRadius: '10px',
                              padding: '10px 12px',
                              fontSize: '12px',
                              color: '#634A14',
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '8px',
                            }}
                          >
                            <Lightbulb size={14} style={{ color: '#B47B16', flexShrink: 0, marginTop: '2px' }} />
                            <div>
                              <strong>Examiner Note: </strong>
                              <span>{msg.response.examinerTip}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#1E1B18' }}>
                        {msg.text}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%] animate-fadeIn">
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: '#EFEAE1',
                  border: '1px solid #E2DCD2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                <Sparkles size={14} style={{ color: '#825E38' }} />
              </div>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E6E1D8',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#756F68',
                }}
              >
                <Loader2 size={14} className="animate-spin" style={{ color: '#825E38' }} />
                <span>Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* ── Fixed Minimalist Chat Input ── */}
      <footer className="p-4 sm:p-5 shrink-0" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="max-w-xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #DCD7CE',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              display: 'flex',
              alignItems: 'center',
              padding: '6px 8px 6px 16px',
              transition: 'border-color 0.15s ease',
            }}
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '15px',
                color: '#1E1B18',
                lineHeight: 1.5,
              }}
            />

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: inputQuery.trim() ? '#1E1B18' : '#E2DCD2',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: inputQuery.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
              title="Send"
            >
              <ArrowUp size={15} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};
export default CeronAIClaudeView;
