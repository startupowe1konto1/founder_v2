import { useState, useRef, useEffect } from "react";

const SECTIONS = [
  {
    id: 0,
    title: "How You Operate",
    subtitle: "Work styles, decision-making & personal approach",
    accent: "#D4A853",
    questions: [
      { id: 1, text: "What are your strengths and superpowers (beyond functional expertise)?" },
      { id: 2, text: "What are your weaknesses? How do you try to compensate for them?" },
      { id: 3, text: "What words would your co-workers use to describe you? What would they want me to know about what it's like to work with you?" },
      { id: 4, text: "How do you deal with conflict? Describe a time you dealt with it well — and a time you didn't." },
      { id: 5, text: "What's the worst interpersonal conflict you've dealt with? How did you handle it?" },
      { id: 6, text: "How do you cope with stress or depression? Are there any red flags your co-founder can help watch out for?" },
      { id: 7, text: "How do you arrive at your convictions? What are some key mental models you use to be creative, solve problems, or make decisions?" },
      { id: 8, text: "Describe your work style. What techniques do you use for personal productivity?" },
    ]
  },
  {
    id: 1,
    title: "Roles",
    subtitle: "Responsibilities, expectations & how you'll divide ownership",
    accent: "#7EB8C9",
    questions: [
      { id: 9, text: "How many hours/week are you willing to work? For how long? What sounds good? What sounds like hell? Do you have different expectations for different phases of the company's lifespan?" },
      { id: 10, text: "What would you want your role to be before we reach product/market fit? What would you want it to be after?" },
      { id: 11, text: "How do you see your role changing as the company starts to scale?" },
      { id: 12, text: "If your current role becomes unavailable entirely (e.g. the board hires a professional CEO or experienced executive), what would you want your new role to be?" },
      { id: 13, text: "Areas of Responsibility: Rate yourself 1-10 in Sales, Marketing, Product Strategy, Design, Engineering, Operations, Fundraising, Leadership, Recruiting, Legal. Where would you want to own responsibility? Where do you want to contribute but not lead?" },
    ]
  },
  {
    id: 2,
    title: "Corporate Structure & Funding",
    subtitle: "Company direction, equity, fundraising & exit strategy",
    accent: "#A89FD4",
    questions: [
      { id: 14, text: "Where should our startup be based? How do you feel about remote or distributed teams? If you have a physical office, how much would you want to work from home?" },
      { id: 15, text: "Is there anything I should know that may materially affect your time or legal status as a founder? (e.g. visa, green card, other commitments)" },
      { id: 16, text: "How should founder equity be set? What's your philosophy on the employee equity pool?" },
      { id: 17, text: "What should our approach to employee compensation be, including cash and equity?" },
      { id: 18, text: "How much money should we raise? On the scale from 'bootstrapped small business' to 'go big or go home,' where do you want this startup to go?" },
      { id: 19, text: "What matters most in a funder? If you were doing reference checks on a VC or potential board member, what traits would you be looking for?" },
      { id: 20, text: "What does an ideal company exit look like to you? (e.g. sell in 2 years for 7 figures vs. 10+ years to IPO)" },
      { id: 21, text: "How do you think about the timeframe and pace of success? Are you willing to take the longer path? How long is too long?" },
      { id: 22, text: "What number would you sell at? How would that change if you got extra liquidity from existing positions?" },
      { id: 23, text: "What do we do if we find product/market fit, yet none of the founders are excited about that product?" },
      { id: 24, text: "Can one co-founder fire another co-founder? Can someone else fire a founder?" },
    ]
  },
  {
    id: 3,
    title: "Personal Motivation",
    subtitle: "Why you're here & what drives you",
    accent: "#C9866E",
    questions: [
      { id: 25, text: "Why do you want to start a company — in general, and in particular right now?" },
      { id: 26, text: "What is success to you? What motivates you personally?" },
      { id: 27, text: "What impact do you want to have? Is your startup objective 'getting rich' or 'changing the world'? Is control or success more important?" },
      { id: 28, text: "What makes you gritty? What keeps you going when things get hard?" },
      { id: 29, text: "Who do you admire most in your organization/family/friends and why?" },
      { id: 30, text: "What are you most proud of in your work career or life to date?" },
      { id: 31, text: "When have you taken a chance when others did not? When have you been willing to take an unpopular stance?" },
      { id: 32, text: "What are some of the products and companies you love, and why?" },
      { id: 33, text: "Is it possible to build a wildly successful company without burning out or damaging other parts of your life (family, health, etc.)?" },
    ]
  },
  {
    id: 4,
    title: "Commitment & Finances",
    subtitle: "Time, money & what you need to survive",
    accent: "#7EB89A",
    questions: [
      { id: 34, text: "Will this company be your primary activity? Do you have any other time commitments?" },
      { id: 35, text: "What is your expected time commitment right now? How do you see that changing in the next 6 months? 2 years?" },
      { id: 36, text: "What is your personal financial runway? Current burn rate? Would you invest your own money (ideally retaining higher equity in return)?" },
      { id: 37, text: "What is the minimum monthly salary you need to survive? To be comfortable? To feel like you've 'made it?'" },
      { id: 38, text: "What should the policy be for co-founders advising or consulting with other companies?" },
    ]
  },
  {
    id: 5,
    title: "Team Culture",
    subtitle: "How you'll build and lead your team",
    accent: "#B8C97E",
    questions: [
      { id: 39, text: "Complete the sentence: It would make you proud to hear people describe this company's culture as _________________." },
      { id: 40, text: "What's your philosophy on how to attract and retain great people? Tactically, how would we make this happen at our company?" },
      { id: 41, text: "What processes or techniques would you use to get the most out of your team? How would you help them become better managers or achieve their goals?" },
      { id: 42, text: "How much of your time do you hope to spend either working or socializing with coworkers?" },
      { id: 43, text: "How important is diversity & inclusion? Concretely, how would you put that into action?" },
    ]
  },
  {
    id: 6,
    title: "Co-Founder Relationship",
    subtitle: "How you'll navigate the partnership itself",
    accent: "#C97EB0",
    questions: [
      { id: 44, text: "Specifically, how are we going to prioritize and make time for our co-founder relationship as we get increasingly busy with company building?" },
      { id: 45, text: "How would we resolve personal conflict between ourselves? How about stalemates?" },
      { id: 46, text: "In case this becomes part of our partnership's evolution, how would you go about handling a startup divorce?" },
      { id: 47, text: "What happens in the scenario where we aren't growing? How would we diagnose the problem? How have our capabilities and approaches contributed to growth failures in the past?" },
      { id: 48, text: "In every partnership, there are times when a partner might breed resentment if certain dissatisfactions don't change over time. How would you deal with a situation like this?" },
      { id: 49, text: "How would you think about bringing on a third (or N+1) co-founder?" },
      { id: 50, text: "Wrap-up: Now that we know each other's weaknesses, passions, needs and constraints — how are we going to make each other successful? What would it take to feel truly partnered in this adventure?" },
    ]
  },
];

const FOUNDER_COLORS = ["#D4A853", "#7EB8C9", "#C9866E", "#A89FD4", "#7EB89A", "#C97EB0"];

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  founderColor: string;
}

const AutoResizeTextarea = ({ value, onChange, placeholder, founderColor }: TextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = Math.max(80, ref.current.scrollHeight) + "px";
    }
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        minHeight: "80px",
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${founderColor}33`,
        borderRadius: "6px",
        padding: "10px 12px",
        color: "#E8E0D0",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        resize: "none",
        outline: "none",
        lineHeight: "1.6",
        transition: "border-color 0.2s",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = founderColor + "99"; }}
      onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = founderColor + "33"; }}
    />
  );
};

interface AnalysisResult {
  overallScore: number;
  headline: string;
  summary: string;
  strengths: { title: string; detail: string }[];
  tensions: { title: string; detail: string; severity: string }[];
  perFounder: { name: string; superpower: string; watchout: string; compatibility: number }[];
  topRecommendations: string[];
}

export default function CoFounderTool() {
  const [screen, setScreen] = useState("landing");
  const [founders, setFounders] = useState(["", ""]);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const setAnswer = (sectionId: number, questionId: number, founderIdx: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [`${sectionId}_${questionId}_${founderIdx}`]: value
    }));
  };

  const getAnswer = (sectionId: number, questionId: number, founderIdx: number): string =>
    answers[`${sectionId}_${questionId}_${founderIdx}`] || "";

  const addFounder = () => {
    if (founders.length < 6) setFounders([...founders, ""]);
  };

  const removeFounder = (idx: number) => {
    if (founders.length > 2) {
      const newF = founders.filter((_: string, i: number) => i !== idx);
      setFounders(newF);
    }
  };

  const updateFounder = (idx: number, val: string) => {
    const nf = [...founders];
    nf[idx] = val;
    setFounders(nf);
  };

  const canStart = founders.filter((f: string) => f.trim()).length >= 2;

  const goToSection = (idx: number) => {
    setCurrentSection(idx);
    setScreen("section");
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getSectionProgress = (sectionId: number) => {
    const section = SECTIONS[sectionId];
    const totalFields = section.questions.length * founders.filter((f: string) => f.trim()).length;
    const filled = section.questions.reduce((acc: number, q: { id: number; text: string }) => {
      return acc + founders.filter((f: string, i: number) => f.trim() && getAnswer(sectionId, q.id, i).trim()).length;
    }, 0);
    return totalFields === 0 ? 0 : Math.round((filled / totalFields) * 100);
  };

  const getTotalProgress = () => {
    const total = SECTIONS.reduce((acc: number, s: typeof SECTIONS[0]) => acc + s.questions.length, 0) * founders.filter((f: string) => f.trim()).length;
    const filled = Object.values(answers).filter((v: string) => v.trim()).length;
    return total === 0 ? 0 : Math.round((filled / total) * 100);
  };

  const runAnalysis = async () => {
    setAnalysisLoading(true);
    setAnalysisError(null);
    setScreen("analysis");

    const activeFounders = founders.filter((f: string) => f.trim());
    let prompt = `You are analyzing co-founder compatibility for a startup. Here are the responses from ${activeFounders.length} potential co-founders to a comprehensive 50-question compatibility questionnaire.\n\n`;

    SECTIONS.forEach(section => {
      prompt += `\n## ${section.title.toUpperCase()}\n`;
      section.questions.forEach(q => {
        prompt += `\nQ${q.id}: ${q.text}\n`;
        activeFounders.forEach((name: string, idx: number) => {
          const ans = getAnswer(section.id, q.id, idx);
          if (ans.trim()) prompt += `${name}: ${ans}\n`;
        });
      });
    });

    prompt += `\n\nBased on these responses, provide a detailed co-founder compatibility analysis. Structure your response as JSON with exactly this format:
{
  "overallScore": <number 0-100>,
  "headline": "<one punchy sentence about this team>",
  "summary": "<3-4 sentence overall assessment>",
  "strengths": [
    {"title": "<strength title>", "detail": "<1-2 sentences>"},
    {"title": "<strength title>", "detail": "<1-2 sentences>"},
    {"title": "<strength title>", "detail": "<1-2 sentences>"}
  ],
  "tensions": [
    {"title": "<tension title>", "detail": "<1-2 sentences>", "severity": "low|medium|high"},
    {"title": "<tension title>", "detail": "<1-2 sentences>", "severity": "low|medium|high"},
    {"title": "<tension title>", "detail": "<1-2 sentences>", "severity": "low|medium|high"}
  ],
  "perFounder": [
    ${activeFounders.map((name: string) => `{"name": "${name}", "superpower": "<their unique value>", "watchout": "<potential risk they bring>", "compatibility": <0-100>}`).join(",\n    ")}
  ],
  "topRecommendations": [
    "<actionable recommendation>",
    "<actionable recommendation>",
    "<actionable recommendation>"
  ]
}

Only return valid JSON. No markdown, no preamble.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = data.content?.map((b: { type: string; text?: string }) => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed: AnalysisResult = JSON.parse(clean);
      setAnalysis(parsed);
    } catch (err) {
      setAnalysisError("Could not generate analysis. Please check your responses and try again.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const section = SECTIONS[currentSection];
  const activeFounders = founders.filter((f: string) => f.trim());

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0D0C0A; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #1a1916; }
    ::-webkit-scrollbar-thumb { background: #3a3830; border-radius: 3px; }
    @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .fadeIn { animation: fadeIn 0.5s ease forwards; }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    .shimmer {
      background: linear-gradient(90deg, #1e1d1a 25%, #2a2925 50%, #1e1d1a 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
  `;

  // ========== LANDING ==========
  if (screen === "landing") {
    return (
      <>
        <style>{styles}</style>
        <div style={{
          minHeight: "100vh", background: "#0D0C0A",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "40px 20px",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 70%)",
          }} />

          <div className="fadeIn" style={{ maxWidth: 560, width: "100%", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ display: "inline-flex", gap: 3, marginBottom: 20 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: i === 1 ? "#D4A853" : "rgba(212,168,83,0.35)",
                  }} />
                ))}
              </div>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 6vw, 52px)",
                fontWeight: 300, color: "#F0E8D8",
                letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 12,
              }}>
                Co-Founder<br/>
                <em style={{ color: "#D4A853", fontWeight: 400 }}>Compatibility</em>
              </h1>
              <p style={{
                color: "#7A7468", fontSize: 14, fontWeight: 300,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                50 questions · 7 sections · AI analysis
              </p>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(212,168,83,0.15)",
              borderRadius: 12, padding: 32, marginBottom: 24,
            }}>
              <p style={{
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#6A6458", marginBottom: 20, fontWeight: 500,
              }}>
                Who's taking part?
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {founders.map((name: string, idx: number) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                      background: FOUNDER_COLORS[idx] + "22",
                      border: `1.5px solid ${FOUNDER_COLORS[idx]}55`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, color: FOUNDER_COLORS[idx], fontWeight: 600,
                      letterSpacing: "0.05em",
                    }}>
                      {name.trim() ? name.trim()[0].toUpperCase() : (idx + 1)}
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFounder(idx, e.target.value)}
                      placeholder={`Co-Founder ${idx + 1} name`}
                      style={{
                        flex: 1, background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${name.trim() ? FOUNDER_COLORS[idx] + "44" : "rgba(255,255,255,0.08)"}`,
                        borderRadius: 7, padding: "10px 14px",
                        color: "#E8E0D0", fontSize: 14,
                        fontFamily: "'DM Sans', sans-serif",
                        outline: "none", transition: "border-color 0.2s",
                      }}
                      onFocus={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = FOUNDER_COLORS[idx] + "77"; }}
                      onBlur={(e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = name.trim() ? FOUNDER_COLORS[idx] + "44" : "rgba(255,255,255,0.08)"; }}
                    />
                    {idx >= 2 && (
                      <button
                        onClick={() => removeFounder(idx)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "#4A4640", fontSize: 18, padding: "0 4px",
                          display: "flex", alignItems: "center", transition: "color 0.2s",
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#C9866E"; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#4A4640"; }}
                      >×</button>
                    )}
                  </div>
                ))}
              </div>

              {founders.length < 6 && (
                <button
                  onClick={addFounder}
                  style={{
                    marginTop: 14, background: "none", border: "1px dashed rgba(212,168,83,0.25)",
                    borderRadius: 7, padding: "8px 14px", cursor: "pointer",
                    color: "#6A6458", fontSize: 13, display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", width: "100%",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)"; e.currentTarget.style.color = "#D4A853"; }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.25)"; e.currentTarget.style.color = "#6A6458"; }}
                >
                  <span style={{ fontSize: 18, lineHeight: "1" }}>+</span>
                  Add another co-founder
                  <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.6 }}>{founders.length}/6</span>
                </button>
              )}
            </div>

            <button
              onClick={() => { setScreen("overview"); }}
              disabled={!canStart}
              style={{
                width: "100%", padding: "16px",
                background: canStart ? "#D4A853" : "rgba(212,168,83,0.15)",
                border: "none", borderRadius: 8, cursor: canStart ? "pointer" : "not-allowed",
                color: canStart ? "#0D0C0A" : "#4A4640",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18, fontWeight: 600, letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { if (canStart) e.currentTarget.style.background = "#E0B85E"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { if (canStart) e.currentTarget.style.background = "#D4A853"; }}
            >
              Begin Questionnaire →
            </button>

            <p style={{ textAlign: "center", marginTop: 16, color: "#3A3830", fontSize: 12, letterSpacing: "0.05em" }}>
              All responses are processed locally in your browser
            </p>
          </div>
        </div>
      </>
    );
  }

  // ========== OVERVIEW ==========
  if (screen === "overview") {
    return (
      <>
        <style>{styles}</style>
        <div style={{ minHeight: "100vh", background: "#0D0C0A", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }} className="fadeIn">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: "#F0E8D8", marginBottom: 6 }}>
                  7 Sections to Complete
                </h2>
                <p style={{ color: "#6A6458", fontSize: 13 }}>
                  {activeFounders.join(", ")} &middot; {getTotalProgress()}% complete
                </p>
              </div>
              {getTotalProgress() >= 30 && (
                <button
                  onClick={runAnalysis}
                  style={{
                    padding: "10px 20px", background: "#D4A853", border: "none", borderRadius: 7,
                    cursor: "pointer", color: "#0D0C0A", fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                  }}
                >Analyse →</button>
              )}
            </div>

            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginBottom: 36, overflow: "hidden" }}>
              <div style={{ height: "100%", width: getTotalProgress() + "%", background: "linear-gradient(90deg, #D4A853, #C9866E)", borderRadius: 2, transition: "width 0.6s ease" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SECTIONS.map((sec, idx) => {
                const prog = getSectionProgress(sec.id);
                return (
                  <button
                    key={sec.id}
                    onClick={() => goToSection(idx)}
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: `1px solid ${prog === 100 ? sec.accent + "44" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 10, padding: "18px 22px", cursor: "pointer", textAlign: "left",
                      transition: "all 0.2s", display: "flex", alignItems: "center", gap: 16,
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = sec.accent + "55"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = prog === 100 ? sec.accent + "44" : "rgba(255,255,255,0.07)"; }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      background: prog === 100 ? sec.accent + "22" : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${prog > 0 ? sec.accent + "55" : "rgba(255,255,255,0.1)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: prog > 0 ? sec.accent : "#4A4640", fontWeight: 600,
                    }}>
                      {prog === 100 ? "✓" : `0${idx + 1}`}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, color: "#E8E0D0", fontWeight: 400, marginBottom: 2 }}>{sec.title}</div>
                      <div style={{ fontSize: 12, color: "#5A5448" }}>{sec.subtitle}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 60, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: prog + "%", background: sec.accent, borderRadius: 2, transition: "width 0.4s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: prog > 0 ? sec.accent : "#3A3830", minWidth: 28 }}>{prog}%</span>
                      <span style={{ fontSize: 16, color: "#3A3830" }}>›</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {getTotalProgress() > 0 && (
              <div style={{
                marginTop: 24, padding: "20px 22px",
                background: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.18)",
                borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: 13, color: "#D4A853", marginBottom: 3 }}>AI Compatibility Analysis</div>
                  <div style={{ fontSize: 12, color: "#5A5448" }}>
                    {getTotalProgress() < 30
                      ? `Complete at least 30% of questions for meaningful analysis (currently ${getTotalProgress()}%)`
                      : "Ready to analyse your team's compatibility"}
                  </div>
                </div>
                <button
                  onClick={runAnalysis}
                  disabled={getTotalProgress() < 30}
                  style={{
                    padding: "10px 20px",
                    background: getTotalProgress() >= 30 ? "#D4A853" : "rgba(212,168,83,0.15)",
                    border: "none", borderRadius: 7,
                    cursor: getTotalProgress() >= 30 ? "pointer" : "not-allowed",
                    color: getTotalProgress() >= 30 ? "#0D0C0A" : "#4A4640",
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                    whiteSpace: "nowrap", flexShrink: 0, marginLeft: 16, transition: "all 0.2s",
                  }}
                >
                  Run Analysis →
                </button>
              </div>
            )}

            <button
              onClick={() => setScreen("landing")}
              style={{
                marginTop: 20, background: "none", border: "none", cursor: "pointer",
                color: "#3A3830", fontSize: 12, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#6A6458"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#3A3830"; }}
            >
              ← Change participants
            </button>
          </div>
        </div>
      </>
    );
  }

  // ========== SECTION PAGE ==========
  if (screen === "section") {
    return (
      <>
        <style>{styles}</style>
        <div ref={topRef} style={{ background: "#0D0C0A", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(13,12,10,0.95)", backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px",
          }}>
            <div style={{ height: 2, background: "rgba(255,255,255,0.04)" }}>
              <div style={{ height: "100%", width: ((currentSection + 1) / SECTIONS.length * 100) + "%", background: section.accent, transition: "width 0.4s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
              <button
                onClick={() => setScreen("overview")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#4A4640", fontSize: 13, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#8A8478"; }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#4A4640"; }}
              >← Overview</button>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: section.accent, display: "block", lineHeight: "1", marginBottom: 3 }}>
                  {currentSection + 1} / {SECTIONS.length}
                </span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#E8E0D0", fontWeight: 400 }}>
                  {section.title}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => { if (currentSection > 0) goToSection(currentSection - 1); }}
                  disabled={currentSection === 0}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "6px 12px", cursor: currentSection === 0 ? "not-allowed" : "pointer", color: currentSection === 0 ? "#3A3830" : "#8A8478", fontSize: 16 }}
                >←</button>
                <button
                  onClick={() => { if (currentSection < SECTIONS.length - 1) goToSection(currentSection + 1); else setScreen("overview"); }}
                  style={{ background: section.accent + "22", border: `1px solid ${section.accent}44`, borderRadius: 6, padding: "6px 12px", cursor: "pointer", color: section.accent, fontSize: 16 }}
                >
                  {currentSection < SECTIONS.length - 1 ? "→" : "✓"}
                </button>
              </div>
            </div>
          </div>

          <div style={{ padding: "32px 24px 16px", maxWidth: 1400, margin: "0 auto" }}>
            <p style={{ color: "#5A5448", fontSize: 12, letterSpacing: "0.06em" }}>{section.subtitle}</p>
          </div>

          <div style={{ padding: "0 24px 80px", maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: `2fr ${activeFounders.map(() => "1fr").join(" ")}`, gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: "#3A3830", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 0 8px 0" }}>Question</div>
              {activeFounders.map((name: string, idx: number) => (
                <div key={idx} style={{ fontSize: 12, letterSpacing: "0.05em", color: FOUNDER_COLORS[idx], padding: "0 0 8px 0", fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: FOUNDER_COLORS[idx] + "22", border: `1.5px solid ${FOUNDER_COLORS[idx]}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>
                    {name[0].toUpperCase()}
                  </div>
                  {name}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {section.questions.map((q, qIdx) => (
                <div key={q.id} className="fadeIn" style={{ display: "grid", gridTemplateColumns: `2fr ${activeFounders.map(() => "1fr").join(" ")}`, gap: 12, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", animationDelay: `${qIdx * 0.05}s` }}>
                  <div style={{ paddingRight: 16 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 10, color: section.accent + "88", fontWeight: 600, letterSpacing: "0.05em", minWidth: 20, paddingTop: 1 }}>
                        {String(q.id).padStart(2, "0")}
                      </span>
                      <p style={{ fontSize: 13, color: "#C0B8A8", lineHeight: 1.65, fontWeight: 300 }}>{q.text}</p>
                    </div>
                  </div>
                  {activeFounders.map((name: string, idx: number) => (
                    <div key={idx}>
                      <AutoResizeTextarea
                        value={getAnswer(section.id, q.id, idx)}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(section.id, q.id, idx, e.target.value)}
                        placeholder={`${name}'s answer…`}
                        founderColor={FOUNDER_COLORS[idx]}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(13,12,10,0.96)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {SECTIONS.map((s, i) => (
                <button key={i} onClick={() => goToSection(i)} style={{ width: i === currentSection ? 24 : 6, height: 6, borderRadius: 3, background: i === currentSection ? s.accent : getSectionProgress(i) > 0 ? s.accent + "55" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#3A3830" }}>{getSectionProgress(currentSection)}% filled</span>
              {currentSection < SECTIONS.length - 1 ? (
                <button onClick={() => goToSection(currentSection + 1)} style={{ background: section.accent, border: "none", borderRadius: 7, padding: "9px 20px", cursor: "pointer", color: "#0D0C0A", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, transition: "all 0.2s" }}>
                  Next Section →
                </button>
              ) : (
                <button onClick={() => setScreen("overview")} style={{ background: "#D4A853", border: "none", borderRadius: 7, padding: "9px 20px", cursor: "pointer", color: "#0D0C0A", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500 }}>
                  Back to Overview ✓
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // ========== ANALYSIS ==========
  if (screen === "analysis") {
    const scoreColor = analysis
      ? analysis.overallScore >= 70 ? "#7EB89A"
        : analysis.overallScore >= 45 ? "#D4A853"
        : "#C9866E"
      : "#D4A853";

    return (
      <>
        <style>{styles}</style>
        <div style={{ minHeight: "100vh", background: "#0D0C0A", fontFamily: "'DM Sans', sans-serif", padding: "40px 20px 80px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }} className="fadeIn">
            <button
              onClick={() => setScreen("overview")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#4A4640", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 32, display: "flex", alignItems: "center", gap: 6 }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#8A8478"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#4A4640"; }}
            >← Back to overview</button>

            {analysisLoading && (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: "#F0E8D8", fontWeight: 300, marginBottom: 16 }}>Analysing your team…</div>
                <p style={{ color: "#5A5448", fontSize: 14, marginBottom: 40 }}>Claude is reading through all your responses</p>
                {[1,2,3].map(i => (<div key={i} className="shimmer" style={{ height: 80, borderRadius: 10, marginBottom: 10 }} />))}
              </div>
            )}

            {analysisError && (
              <div style={{ textAlign: "center", padding: 40, background: "rgba(201,134,110,0.08)", border: "1px solid rgba(201,134,110,0.2)", borderRadius: 10 }}>
                <p style={{ color: "#C9866E", marginBottom: 16 }}>{analysisError}</p>
                <button onClick={runAnalysis} style={{ background: "#C9866E", border: "none", borderRadius: 7, padding: "10px 20px", cursor: "pointer", color: "#0D0C0A", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>Try again</button>
              </div>
            )}

            {analysis && !analysisLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${scoreColor}33`, borderRadius: 12, padding: "36px 32px", textAlign: "center" }}>
                  <div style={{ fontSize: 72, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: scoreColor, lineHeight: "1", marginBottom: 8 }}>{analysis.overallScore}</div>
                  <div style={{ fontSize: 11, color: "#5A5448", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>Compatibility Score</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#E8E0D0", fontWeight: 300, fontStyle: "italic", marginBottom: 16 }}>"{analysis.headline}"</p>
                  <p style={{ color: "#8A8478", fontSize: 14, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>{analysis.summary}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(analysis.perFounder.length, 3)}, 1fr)`, gap: 12 }}>
                  {analysis.perFounder.map((f, idx) => (
                    <div key={idx} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${FOUNDER_COLORS[idx]}33`, borderRadius: 10, padding: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: FOUNDER_COLORS[idx] + "22", border: `1.5px solid ${FOUNDER_COLORS[idx]}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: FOUNDER_COLORS[idx], fontWeight: 600 }}>
                          {f.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, color: "#E8E0D0" }}>{f.name}</div>
                          <div style={{ fontSize: 11, color: FOUNDER_COLORS[idx] }}>{f.compatibility}% fit</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 10, color: "#5A5448", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Superpower</div>
                        <div style={{ fontSize: 12, color: "#B0A898", lineHeight: 1.5 }}>{f.superpower}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: "#5A5448", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Watch out for</div>
                        <div style={{ fontSize: 12, color: "#B0A898", lineHeight: 1.5 }}>{f.watchout}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ background: "rgba(126,184,154,0.05)", border: "1px solid rgba(126,184,154,0.2)", borderRadius: 10, padding: 22 }}>
                    <div style={{ fontSize: 11, color: "#7EB89A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>✦ Team Strengths</div>
                    {analysis.strengths.map((s, i) => (
                      <div key={i} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 13, color: "#C0D4C8", fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
                        <div style={{ fontSize: 12, color: "#6A7870", lineHeight: 1.6 }}>{s.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(201,134,110,0.05)", border: "1px solid rgba(201,134,110,0.2)", borderRadius: 10, padding: 22 }}>
                    <div style={{ fontSize: 11, color: "#C9866E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>⚡ Potential Tensions</div>
                    {analysis.tensions.map((t, i) => (
                      <div key={i} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <div style={{ fontSize: 13, color: "#D4C0B8", fontWeight: 500 }}>{t.title}</div>
                          <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 10, letterSpacing: "0.06em", background: t.severity === "high" ? "rgba(201,100,80,0.2)" : t.severity === "medium" ? "rgba(212,168,83,0.2)" : "rgba(126,184,154,0.15)", color: t.severity === "high" ? "#C9866E" : t.severity === "medium" ? "#D4A853" : "#7EB89A", textTransform: "uppercase" }}>{t.severity}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "#6A6458", lineHeight: 1.6 }}>{t.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "rgba(212,168,83,0.05)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 10, padding: 24 }}>
                  <div style={{ fontSize: 11, color: "#D4A853", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>→ Recommendations</div>
                  {analysis.topRecommendations.map((rec, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, paddingBottom: 12, borderBottom: i < analysis.topRecommendations.length - 1 ? "1px solid rgba(212,168,83,0.1)" : "none" }}>
                      <span style={{ fontSize: 10, color: "#D4A853", fontWeight: 600, minWidth: 18, paddingTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                      <p style={{ fontSize: 13, color: "#C0B090", lineHeight: 1.65 }}>{rec}</p>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: "center", paddingTop: 8 }}>
                  <button
                    onClick={runAnalysis}
                    style={{ background: "none", border: "1px solid rgba(212,168,83,0.25)", borderRadius: 7, padding: "10px 20px", cursor: "pointer", color: "#6A6458", fontFamily: "'DM Sans', sans-serif", fontSize: 12, transition: "all 0.2s" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#D4A853"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)"; }}
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.color = "#6A6458"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.25)"; }}
                  >↺ Regenerate analysis</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  return null;
}
