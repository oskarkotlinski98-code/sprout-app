import { useState, useEffect, useRef } from "react";

export default function Sprout() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("idle"); // idle | growing | grown
  const vineRef = useRef(null);
  const placeholder = "a habit tracker with a streak flame and weekly graph";
  const [typedPlaceholder, setTypedPlaceholder] = useState("");

  // Typewriter effect for the placeholder text
  useEffect(() => {
    let i = 0;
    let timeout;
    const tick = () => {
      if (i <= placeholder.length) {
        setTypedPlaceholder(placeholder.slice(0, i));
        i++;
        timeout = setTimeout(tick, 38);
      }
    };
    tick();
    return () => clearTimeout(timeout);
  }, []);

  const handleGrow = (e) => {
    e.preventDefault();
    if (status === "growing") return;
    setStatus("growing");
    window.setTimeout(() => setStatus("grown"), 1600);
  };

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');

        :root {
          --paper: #FAF6EE;
          --paper-dim: #F1EBDD;
          --ink: #201F18;
          --ink-soft: #5B5747;
          --coral: #FF6A3D;
          --coral-dim: #FFD9C7;
          --moss: #52734D;
          --moss-dim: #DCE7D3;
          --line: #DCD5C3;
        }

        * { box-sizing: border-box; }

        .page {
          min-height: 100vh;
          background: var(--paper);
          background-image:
            radial-gradient(circle at 1px 1px, rgba(32,31,24,0.06) 1px, transparent 0);
          background-size: 22px 22px;
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 24px 80px;
        }

        @media (prefers-reduced-motion: reduce) {
          .page * { animation: none !important; transition: none !important; }
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 48px;
          margin-bottom: 64px;
        }
        .brand-mark {
          width: 30px;
          height: 30px;
          position: relative;
        }
        .brand-name {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .hero {
          max-width: 720px;
          text-align: center;
          margin-bottom: 56px;
        }
        .eyebrow {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: var(--moss);
          background: var(--moss-dim);
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 22px;
          letter-spacing: 0.01em;
        }
        .hero h1 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(40px, 6.5vw, 68px);
          line-height: 1.04;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
        }
        .hero h1 em {
          font-style: italic;
          color: var(--coral);
        }
        .hero p {
          font-size: 18px;
          color: var(--ink-soft);
          line-height: 1.55;
          margin: 0 auto;
          max-width: 480px;
        }

        .console-wrap {
          width: 100%;
          max-width: 640px;
          position: relative;
        }

        .console {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 18px;
          padding: 22px 22px 16px;
          box-shadow: 0 1px 2px rgba(32,31,24,0.04), 0 12px 30px -14px rgba(32,31,24,0.18);
          position: relative;
          z-index: 2;
        }
        .console-dots { display: flex; gap: 6px; margin-bottom: 14px; }
        .console-dots span {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--line);
        }
        .console-input-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-height: 52px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
        }
        .console-caret { color: var(--coral); font-weight: 600; }
        .console-text {
          flex: 1;
          text-align: left;
          color: var(--ink);
        }
        .console-text.placeholder { color: var(--ink-soft); }
        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 18px;
          background: var(--coral);
          margin-left: 2px;
          transform: translateY(3px);
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .console-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .console-hint { font-size: 12.5px; color: var(--ink-soft); }
        .grow-btn {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 14px;
          background: var(--ink);
          color: var(--paper);
          border: none;
          border-radius: 100px;
          padding: 10px 18px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .grow-btn:hover { background: var(--coral); transform: translateY(-1px); }
        .grow-btn:active { transform: translateY(0); }
        .grow-btn:focus-visible {
          outline: 2px solid var(--coral);
          outline-offset: 2px;
        }
        .grow-btn .sprout-icon { transition: transform 0.4s ease; }
        .grow-btn.growing .sprout-icon { transform: rotate(180deg) scale(1.15); }

        .vine-svg {
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          width: 4px;
          height: 96px;
          z-index: 1;
          overflow: visible;
        }
        .vine-path {
          stroke: var(--moss);
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          transition: stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1);
        }
        .vine-path.growing { stroke-dashoffset: 0; }
        .vine-leaf {
          opacity: 0;
          transform: scale(0.4);
          transform-origin: center;
          transition: opacity 0.4s ease 0.9s, transform 0.4s ease 0.9s;
        }
        .vine-leaf.growing { opacity: 1; transform: scale(1); }

        .app-card {
          margin-top: 96px;
          width: 100%;
          max-width: 460px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(14px) scale(0.98);
          transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
          box-shadow: 0 20px 45px -20px rgba(32,31,24,0.25);
        }
        .app-card.grown { opacity: 1; transform: translateY(0) scale(1); }
        .app-card-bar {
          background: var(--paper-dim);
          padding: 10px 14px;
          display: flex;
          gap: 6px;
          border-bottom: 1px solid var(--line);
        }
        .app-card-bar span { width: 7px; height: 7px; border-radius: 50%; background: var(--line); }
        .app-card-body { padding: 22px; text-align: left; }
        .app-card-title { font-family: 'Fraunces', serif; font-size: 19px; margin: 0 0 4px; }
        .app-card-sub { font-size: 13.5px; color: var(--ink-soft); margin: 0 0 18px; }
        .streak-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .flame { font-size: 22px; }
        .streak-count { font-family: 'Fraunces', serif; font-size: 24px; }
        .streak-label { font-size: 12.5px; color: var(--ink-soft); }
        .bars { display: flex; align-items: flex-end; gap: 6px; height: 46px; }
        .bars div { flex: 1; background: var(--moss-dim); border-radius: 4px 4px 0 0; }
        .bars div:nth-child(4), .bars div:nth-child(6) { background: var(--moss); }

        .features {
          margin-top: 120px;
          width: 100%;
          max-width: 860px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 16px;
          overflow: hidden;
        }
        @media (max-width: 720px) {
          .features { grid-template-columns: 1fr; }
        }
        .feature {
          background: var(--paper);
          padding: 30px 26px;
          text-align: left;
        }
        .feature-word {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--coral);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .feature h3 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: 19px;
          margin: 0 0 8px;
        }
        .feature p {
          font-size: 14.5px;
          color: var(--ink-soft);
          line-height: 1.5;
          margin: 0;
        }

        .cta-band {
          margin-top: 120px;
          text-align: center;
        }
        .cta-band h2 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(28px, 4vw, 38px);
          margin: 0 0 12px;
        }
        .cta-band p {
          color: var(--ink-soft);
          margin: 0 0 26px;
          font-size: 15.5px;
        }
        .cta-final {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          background: var(--coral);
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 13px 26px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px -10px rgba(255,106,61,0.6);
        }
        .cta-final:hover { transform: translateY(-2px); }
        .cta-final:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

        .foot-note {
          margin-top: 28px;
          font-size: 12.5px;
          color: var(--ink-soft);
        }
      `}</style>

      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 30 30" fill="none">
          <path d="M15 26C15 26 6 21 6 13.5C6 8 10 5 15 9C20 5 24 8 24 13.5C24 21 15 26 15 26Z" fill="#FF6A3D" opacity="0.15"/>
          <path d="M15 26V12M15 12C15 12 8 11 8 5C13 5 15 12 15 12ZM15 12C15 12 22 11 22 5C17 5 15 12 15 12Z" stroke="#52734D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="brand-name">sprout</span>
      </div>

      <div className="hero">
        <span className="eyebrow">from prompt to product</span>
        <h1>Describe it.<br /><em>Watch it grow.</em></h1>
        <p>Type what you want to build in plain English. Sprout turns it into a working app you can use, tweak, and share — no setup required.</p>
      </div>

      <div className="console-wrap">
        <form className="console" onSubmit={handleGrow}>
          <div className="console-dots"><span /><span /><span /></div>
          <div className="console-input-row">
            <span className="console-caret">›</span>
            {prompt ? (
              <span className="console-text">{prompt}</span>
            ) : (
              <span className="console-text placeholder">{typedPlaceholder}</span>
            )}
            <input
              aria-label="Describe the app you want to build"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0 }}
            />
            <span className="cursor-blink" />
          </div>
          <div className="console-footer">
            <span className="console-hint">Press build when you're ready</span>
            <button type="submit" className={`grow-btn ${status === "growing" ? "growing" : ""}`}>
              <span className="sprout-icon">🌱</span>
              {status === "idle" && "Build it"}
              {status === "growing" && "Growing…"}
              {status === "grown" && "Grown"}
            </button>
          </div>
        </form>

        <svg className="vine-svg" viewBox="0 0 4 96" ref={vineRef}>
          <path className={`vine-path ${status !== "idle" ? "growing" : ""}`} d="M2 0 L2 96" />
          <g className={`vine-leaf ${status !== "idle" ? "growing" : ""}`} transform="translate(2,50)">
            <path d="M0 0 C 8 -6, 14 0, 0 8 C -14 0, -8 -6, 0 0 Z" fill="#52734D" />
          </g>
        </svg>

        <div className={`app-card ${status === "grown" ? "grown" : ""}`} aria-hidden={status !== "grown"}>
          <div className="app-card-bar"><span /><span /><span /></div>
          <div className="app-card-body">
            <p className="app-card-title">Daily Streaks</p>
            <p className="app-card-sub">Your habit tracker, built just now</p>
            <div className="streak-row">
              <span className="flame">🔥</span>
              <div>
                <div className="streak-count">12</div>
                <div className="streak-label">day streak</div>
              </div>
            </div>
            <div className="bars">
              <div style={{ height: "40%" }} />
              <div style={{ height: "65%" }} />
              <div style={{ height: "30%" }} />
              <div style={{ height: "85%" }} />
              <div style={{ height: "50%" }} />
              <div style={{ height: "95%" }} />
              <div style={{ height: "70%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-word">Describe</div>
          <h3>Plain language in</h3>
          <p>Write what the app should do like you're explaining it to a friend. No diagrams, no tickets.</p>
        </div>
        <div className="feature">
          <div className="feature-word">Preview</div>
          <h3>Real app, instantly</h3>
          <p>See a working version appear as you go, not a mockup — click through it, type into it, break it.</p>
        </div>
        <div className="feature">
          <div className="feature-word">Refine</div>
          <h3>Say what to change</h3>
          <p>"Make the button green" works. Sprout edits the actual app, not just the words describing it.</p>
        </div>
      </div>

      <div className="cta-band">
        <h2>Your next idea is one sentence away</h2>
        <p>Free to start. No credit card, no install.</p>
        <button className="cta-final" onClick={handleGrow}>Start growing →</button>
        <div className="foot-note">sprout — a demo landing page</div>
      </div>
    </div>
  );
}
