import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lf-root {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    overflow: hidden;
    position: relative;
  }

  .lf-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 80%, rgba(255,140,60,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 80% 20%, rgba(100,60,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  .lf-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .lf-card {
    position: relative;
    width: 420px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    padding: 52px 48px 44px;
    backdrop-filter: blur(12px);
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lf-tag {
    display: inline-block;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff8c3c;
    border: 1px solid rgba(255,140,60,0.35);
    padding: 4px 10px;
    border-radius: 2px;
    margin-bottom: 20px;
  }

  .lf-title {
    font-family: 'DM Serif Display', serif;
    font-size: 36px;
    color: #f0ede8;
    line-height: 1.1;
    margin-bottom: 6px;
    letter-spacing: -0.5px;
  }

  .lf-title em {
    font-style: italic;
    color: #c8b8a2;
  }

  .lf-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.05em;
    margin-bottom: 40px;
  }

  .lf-field {
    margin-bottom: 20px;
    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .lf-field:nth-child(1) { animation-delay: 0.1s; }
  .lf-field:nth-child(2) { animation-delay: 0.18s; }

  .lf-label {
    display: block;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  .lf-input-wrap {
    position: relative;
  }

  .lf-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    padding: 13px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #f0ede8;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    letter-spacing: 0.02em;
  }

  .lf-input::placeholder {
    color: rgba(255,255,255,0.15);
  }

  .lf-input:focus {
    border-color: rgba(255,140,60,0.5);
    background: rgba(255,140,60,0.04);
  }

  .lf-input.error {
    border-color: rgba(255,80,80,0.6);
  }

  .lf-error {
    font-size: 10px;
    color: #ff6060;
    letter-spacing: 0.05em;
    margin-top: 5px;
  }

  .lf-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 28px 0;
  }

  .lf-btn {
    width: 100%;
    background: #ff8c3c;
    border: none;
    border-radius: 2px;
    padding: 14px 24px;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #0a0a0f;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
    animation: fadeUp 0.6s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .lf-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.12);
    transform: translateX(-100%);
    transition: transform 0.35s ease;
  }

  .lf-btn:hover::before { transform: translateX(0); }

  .lf-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(255,140,60,0.3);
  }

  .lf-btn:active { transform: translateY(0); }

  .lf-btn.loading {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .lf-success {
    text-align: center;
    padding: 20px 0;
    animation: fadeUp 0.5s ease both;
  }

  .lf-success-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255,140,60,0.15);
    border: 1px solid rgba(255,140,60,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 20px;
  }

  .lf-success-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #f0ede8;
    margin-bottom: 6px;
  }

  .lf-success-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.05em;
  }

  .lf-success-data {
    margin-top: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 2px;
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.04em;
    line-height: 1.8;
  }

  .lf-success-data span { color: #ff8c3c; }

  .lf-footer {
    margin-top: 24px;
    font-size: 10px;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.08em;
    text-align: center;
  }

  .lf-corner {
    position: absolute;
    width: 10px;
    height: 10px;
    border-color: rgba(255,140,60,0.4);
    border-style: solid;
  }
  .lf-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .lf-corner.tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .lf-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .lf-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
`;

function validate(username, email) {
  const errors = {};
  if (!username.trim()) errors.username = "Username is required";
  else if (username.trim().length < 3) errors.username = "Min. 3 characters";
  if (!email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email";
  return errors;
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const errs = validate(username, email);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lf-root">
        <div className="lf-bg" />
        <div className="lf-grid" />
        <div className="lf-card">
          <div className="lf-corner tl" />
          <div className="lf-corner tr" />
          <div className="lf-corner bl" />
          <div className="lf-corner br" />

          {submitted ? (
            <div className="lf-success">
              <div className="lf-success-icon">✓</div>
              <div className="lf-success-title">Welcome <em>aboard.</em></div>
              <div className="lf-success-sub">Account verified successfully</div>
              <div className="lf-success-data">
                <div>user / <span>{username}</span></div>
                <div>mail / <span>{email}</span></div>
                <div>status / <span>authenticated</span></div>
              </div>
            </div>
          ) : (
            <>
              <div className="lf-tag">[ access portal ]</div>
              <h1 className="lf-title">Sign <em>into</em><br />your account</h1>
              <p className="lf-sub">Enter your credentials to continue →</p>

              <div className="lf-field">
                <label className="lf-label">Username</label>
                <div className="lf-input-wrap">
                  <input
                    className={`lf-input${errors.username ? " error" : ""}`}
                    type="text"
                    placeholder="e.g. johndoe"
                    value={username}
                    onChange={e => { setUsername(e.target.value); setErrors(p => ({ ...p, username: "" })); }}
                  />
                </div>
                {errors.username && <div className="lf-error">↑ {errors.username}</div>}
              </div>

              <div className="lf-field">
                <label className="lf-label">Email Address</label>
                <div className="lf-input-wrap">
                  <input
                    className={`lf-input${errors.email ? " error" : ""}`}
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: "" })); }}
                  />
                </div>
                {errors.email && <div className="lf-error">↑ {errors.email}</div>}
              </div>

              <div className="lf-divider" />

              <button
                className={`lf-btn${loading ? " loading" : ""}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Continue →"}
              </button>

              <div className="lf-footer">
                sys.v2.4.1 · secured connection · 2026
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}