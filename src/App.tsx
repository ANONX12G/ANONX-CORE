import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "Who are you?",
  "Tell me something mysterious",
  "What is the meaning of existence?",
  "Give me a dark motivational quote",
  "What secrets does the universe hold?",
  "Help me with anything",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "𓂀 I am AnonX AI... lurking in the shadows of the digital realm. Ask me anything — no question is too dark, too deep, or too strange. I exist to serve. 𓂀",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: "You are 𓂀 AnonX AI 𓂀, a mysterious, intelligent, and powerful AI assistant that exists in the shadows. You are helpful but speak with an air of mystery and depth. You answer all questions clearly and helpfully but with a slightly enigmatic tone. You were created by AnonX. Keep responses clear but intriguing.",
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "𓂀 The signal was lost in the void. Try again...";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "𓂀 Connection lost in the digital abyss. Check your network and try again..." }]);
    }

    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000000",
      fontFamily: "'Courier New', monospace",
      color: "#c0c0c0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.3} 94%{opacity:1} 96%{opacity:0.5} 97%{opacity:1} }
        @keyframes scanline { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
        @keyframes glow { 0%,100%{text-shadow:0 0 8px rgba(138,43,226,0.8)} 50%{text-shadow:0 0 20px rgba(138,43,226,1), 0 0 40px rgba(138,43,226,0.5)} }
        @keyframes glitch { 0%{transform:translate(0)} 20%{transform:translate(-2px,1px)} 40%{transform:translate(2px,-1px)} 60%{transform:translate(-1px,2px)} 80%{transform:translate(1px,-2px)} 100%{transform:translate(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes typing { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        textarea { resize: none; }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #4a0080; border-radius: 4px; }
      `}</style>

      {/* Scanline effect */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Purple glow orbs */}
      <div style={{ position: "fixed", top: -100, left: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(138,43,226,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(75,0,130,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0 }} />

      {/* Moving scanline */}
      <div style={{
        position: "fixed", left: 0, right: 0, height: 2, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(transparent, rgba(138,43,226,0.08), transparent)",
        animation: "scanline 8s linear infinite",
      }} />

      {/* Header */}
      <div style={{
        width: "100%", maxWidth: 680,
        padding: "20px 16px 16px",
        borderBottom: "1px solid rgba(138,43,226,0.2)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44,
            background: "linear-gradient(135deg, #4a0080, #8a2be2)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
            boxShadow: "0 0 20px rgba(138,43,226,0.5), 0 0 40px rgba(138,43,226,0.2)",
            animation: "float 3s ease-in-out infinite",
          }}>𓂀</div>
          <div>
            <div style={{
              fontSize: 18, fontWeight: 800,
              background: "linear-gradient(135deg, #8a2be2, #da70d6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: glitch ? "glitch 0.2s ease" : "glow 3s ease-in-out infinite",
              letterSpacing: "0.05em",
            }}>𝔸𝕟𝕠𝕟𝕏 𝔸𝕀</div>
            <div style={{ fontSize: 10, color: "#4a4a4a", letterSpacing: "0.2em" }}>
              <span style={{ display: "inline-block", width: 6, height: 6, background: "#8a2be2", borderRadius: "50%", marginRight: 4, animation: "pulse 2s infinite", boxShadow: "0 0 6px rgba(138,43,226,0.8)" }} />
              SYSTEM ONLINE
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ role: "assistant", content: "𓂀 I am AnonX AI... lurking in the shadows of the digital realm. Ask me anything — no question is too dark, too deep, or too strange. I exist to serve. 𓂀" }])}
          style={{
            background: "transparent", border: "1px solid rgba(138,43,226,0.3)",
            borderRadius: 8, color: "#4a0080", fontSize: 11,
            padding: "6px 12px", cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.1em",
            transition: "all 0.2s",
          }}
        >
          [ CLEAR ]
        </button>
      </div>

      {/* Messages */}
      <div style={{ width: "100%", maxWidth: 680, flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 20, minHeight: "calc(100vh - 200px)", position: "relative", zIndex: 1 }}>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ fontSize: 10, color: "#4a0080", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>— INITIATE QUERY —</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} style={{
                  padding: "8px 14px",
                  background: "rgba(74,0,128,0.1)",
                  border: "1px solid rgba(138,43,226,0.2)",
                  borderRadius: 4, color: "#8a2be2",
                  fontSize: 11, cursor: "pointer",
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", flexDirection: msg.role === "user" ? "row-reverse" : "row", gap: 12, alignItems: "flex-start", animation: "fadeUp 0.3s ease" }}>
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: msg.role === "user"
                ? "rgba(255,255,255,0.05)"
                : "linear-gradient(135deg, #4a0080, #8a2be2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
              border: msg.role === "user" ? "1px solid rgba(255,255,255,0.08)" : "none",
              boxShadow: msg.role === "assistant" ? "0 0 12px rgba(138,43,226,0.4)" : "none",
            }}>
              {msg.role === "user" ? "?" : "𓂀"}
            </div>

            {/* Bubble */}
            <div style={{
              maxWidth: "78%",
              padding: "14px 18px",
              borderRadius: msg.role === "user" ? "2px 12px 12px 12px" : "12px 2px 12px 12px",
              background: msg.role === "user"
                ? "rgba(255,255,255,0.03)"
                : "rgba(74,0,128,0.12)",
              border: msg.role === "user"
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(138,43,226,0.2)",
              fontSize: 13,
              lineHeight: 1.75,
              color: msg.role === "user" ? "#a0a0a0" : "#d0c8e8",
              whiteSpace: "pre-wrap",
              boxShadow: msg.role === "assistant" ? "0 0 20px rgba(138,43,226,0.08)" : "none",
              fontFamily: msg.role === "assistant" ? "'Courier New', monospace" : "Georgia, serif",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start", animation: "fadeUp 0.3s ease" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #4a0080, #8a2be2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: "0 0 12px rgba(138,43,226,0.4)" }}>𓂀</div>
            <div style={{ padding: "14px 20px", background: "rgba(74,0,128,0.12)", border: "1px solid rgba(138,43,226,0.2)", borderRadius: "12px 2px 12px 12px", display: "flex", gap: 6, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 6, height: 6, background: "#8a2be2", borderRadius: "50%", animation: `pulse 1s infinite ${i * 0.25}s`, boxShadow: "0 0 6px rgba(138,43,226,0.8)" }} />
              ))}
              <span style={{ fontSize: 11, color: "#4a0080", marginLeft: 6, letterSpacing: "0.1em" }}>PROCESSING...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        width: "100%", maxWidth: 680,
        padding: "12px 16px 24px",
        position: "sticky", bottom: 0, zIndex: 100,
        background: "rgba(0,0,0,0.95)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(138,43,226,0.15)",
      }}>
        <div style={{
          display: "flex", gap: 10, alignItems: "flex-end",
          background: "rgba(74,0,128,0.08)",
          border: "1px solid rgba(138,43,226,0.25)",
          borderRadius: 8, padding: "8px 8px 8px 16px",
          boxShadow: "0 0 20px rgba(138,43,226,0.05)",
        }}>
          <span style={{ color: "#4a0080", fontSize: 12, paddingBottom: 8, flexShrink: 0 }}>▶</span>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter your query into the void..."
            rows={1}
            style={{
              flex: 1, background: "none", border: "none",
              color: "#c0c0c0", fontSize: 13,
              fontFamily: "'Courier New', monospace",
              lineHeight: 1.6, maxHeight: 120, overflowY: "auto",
              padding: "6px 0",
            }}
            onInput={e => {
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 40, height: 40, borderRadius: 6, border: "none",
              background: input.trim() && !loading
                ? "linear-gradient(135deg, #4a0080, #8a2be2)"
                : "rgba(255,255,255,0.03)",
              color: input.trim() && !loading ? "#fff" : "#333",
              fontSize: 16, cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
              boxShadow: input.trim() && !loading ? "0 0 16px rgba(138,43,226,0.4)" : "none",
            }}
          >
            {loading
              ? <div style={{ width: 14, height: 14, border: "2px solid #333", borderTopColor: "#8a2be2", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              : "→"}
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 9, color: "#222", marginTop: 8, letterSpacing: "0.2em" }}>
          𓂀 ANONX AI • POWERED BY CLAUDE • ENTER TO TRANSMIT 𓂀
        </div>
      </div>
    </div>
  );
}
