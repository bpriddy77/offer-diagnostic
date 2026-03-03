import { useState } from 'react'

// ── BRAND COLORS ──────────────────────────────────────────────
const C = {
  teal:       '#0B3D3F',
  tealDark:   '#0B1F20',
  gold:       '#B8976A',
  goldLight:  '#D4B48C',
  cream:      '#FAF6EF',
  creamDark:  '#F0E9DC',
  text:       '#2C3E35',
  textLight:  '#5a7068',
  white:      '#ffffff',
}

// ── QUESTIONS ─────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'revenue',
    question: 'How would you describe your revenue over the last 6 months?',
    answers: [
      { label: 'Feast or famine — big months, then nothing', value: 'feast_famine' },
      { label: 'Steady but stuck — it doesn\'t grow much', value: 'steady_stuck' },
      { label: 'Growing, but I can\'t predict when or why', value: 'growing_unpredictable' },
      { label: 'Inconsistent — I can\'t see the pattern', value: 'inconsistent' },
    ]
  },
  {
    id: 'offer',
    question: 'What does your primary offer look like right now?',
    answers: [
      { label: 'One high-ticket offer ($2K+) — most of my revenue comes from this', value: 'high_ticket' },
      { label: 'Multiple smaller offers — nothing over $1K', value: 'low_ticket_multiple' },
      { label: 'Done-for-you services — I trade time for money', value: 'dfy_services' },
      { label: 'A mix — I have several things at different prices', value: 'mixed' },
    ]
  },
  {
    id: 'leads',
    question: 'Where do most of your clients come from?',
    answers: [
      { label: 'Referrals and word of mouth — almost entirely', value: 'referrals' },
      { label: 'Social media — organic content and DMs', value: 'social_organic' },
      { label: 'Paid ads or an email list I\'ve built', value: 'paid_or_list' },
      { label: 'A mix of places — no single source dominates', value: 'mixed_leads' },
    ]
  },
  {
    id: 'blame',
    question: 'When revenue dips, what do you find yourself working on?',
    answers: [
      { label: 'My messaging — trying to explain my offer better', value: 'messaging' },
      { label: 'Visibility — posting more, showing up more', value: 'visibility' },
      { label: 'My pricing — wondering if I\'m charging too much', value: 'pricing' },
      { label: 'A new offer — maybe I need something different', value: 'new_offer' },
    ]
  },
  {
    id: 'recurring',
    question: 'How much of your revenue is recurring (monthly retainers, memberships, subscriptions)?',
    answers: [
      { label: 'None — everything is one-time payments', value: 'none' },
      { label: 'A little — under 20% of my total revenue', value: 'some' },
      { label: 'A good chunk — 20–50% comes back monthly', value: 'significant' },
      { label: 'Most of it — over 50% is recurring', value: 'majority' },
    ]
  },
]

// ── GAP DETECTION ─────────────────────────────────────────────
function detectGap(answers) {
  const { revenue, offer, leads, blame, recurring } = answers

  // Missing Evergreen Path
  if (offer === 'high_ticket' && leads === 'referrals' && recurring === 'none') {
    return 'no_evergreen'
  }
  // No Retention Layer
  if (recurring === 'none' && (revenue === 'feast_famine' || revenue === 'inconsistent')) {
    return 'no_retention'
  }
  // Scattered Offer Structure
  if (offer === 'mixed' || offer === 'low_ticket_multiple') {
    return 'scattered_structure'
  }
  // Missing Relationship Layer
  if (leads === 'referrals' && revenue === 'steady_stuck') {
    return 'no_relationship_layer'
  }
  // Authority Ceiling
  if (leads === 'social_organic' && blame === 'visibility' && offer === 'high_ticket') {
    return 'authority_ceiling'
  }
  // Invisible Funnel
  if (leads === 'mixed_leads' && revenue === 'growing_unpredictable') {
    return 'invisible_funnel'
  }
  // Pricing Misalignment
  if (blame === 'pricing' || (offer === 'dfy_services' && revenue === 'steady_stuck')) {
    return 'pricing_misalignment'
  }
  // Missing Bridge Offer (default / catch-all)
  return 'no_bridge_offer'
}

// ── GAP CONTENT ───────────────────────────────────────────────
const GAP_CONTENT = {
  no_evergreen: {
    label: 'Missing Evergreen Path',
    headline: 'Your signature offer is solid. Nothing is feeding it.',
    why: 'Your revenue depends entirely on referrals and word of mouth. When they flow, you\'re busy. When they slow, everything stops. There\'s no system running in the background to keep leads coming in.',
    missing: [
      'A lead magnet that works while you\'re not working',
      'An entry offer that converts strangers into buyers before they\'re ready for the big commitment',
      'An automated path from "just found you" to "ready to hire you"',
    ],
    cost: 'Every quiet month is a referral drought, not a business problem. But it feels like a business problem.',
    unlock: 'An evergreen funnel running in the background means revenue doesn\'t stop when referrals do.',
  },
  no_retention: {
    label: 'No Retention Layer',
    headline: 'Every month you start at zero. That\'s the whole problem.',
    why: 'You\'re great at getting clients. You\'re not set up to keep them in your ecosystem. When a project ends, the relationship ends — and you\'re back to selling from scratch.',
    missing: [
      'A recurring offer that keeps clients paying after the project closes',
      'A membership or retainer that creates predictable monthly income',
      'A reason for past clients to stay in your world instead of leaving it',
    ],
    cost: 'Without recurring revenue, every slow month is a crisis. You can\'t plan, can\'t hire, can\'t breathe.',
    unlock: 'Even 20% recurring revenue changes everything. Slow months become manageable instead of terrifying.',
  },
  scattered_structure: {
    label: 'Scattered Offer Structure',
    headline: 'You have offers. They just don\'t work together.',
    why: 'You\'ve built things at different price points over time, but they exist as separate products, not a connected ecosystem. Buyers don\'t have a natural path from one to the next.',
    missing: [
      'A clear entry point that feeds your higher-ticket offer',
      'Logical progression — each offer should make the next one obvious',
      'A bridge offer that catches people who aren\'t ready to go straight to your signature',
    ],
    cost: 'Scattered offers mean scattered revenue. You work hard across too many things and none of them compound.',
    unlock: 'When your offers have a logic to them, buying one makes the next one feel inevitable.',
  },
  no_relationship_layer: {
    label: 'Missing Relationship Layer',
    headline: 'Referrals are great. Until they\'re not enough.',
    why: 'Word of mouth built your business, and it\'s working — but it\'s capped. You can only grow as fast as your existing clients talk about you. There\'s no way to reach people who don\'t know you yet.',
    missing: [
      'A free lead magnet that works for cold audiences — people who\'ve never heard of you',
      'A low-friction entry offer that converts strangers, not just warm referrals',
      'An owned audience (email list) that doesn\'t depend on algorithms or other people\'s networks',
    ],
    cost: 'Referral-only growth has a ceiling. When you hit it, growth stops completely.',
    unlock: 'A relationship layer means your business can grow beyond the people who already know you.',
  },
  authority_ceiling: {
    label: 'Authority Ceiling',
    headline: 'Your offer is right. Your funnel isn\'t wide enough to fill it.',
    why: 'You\'re showing up consistently and the content is good — but social media alone can\'t fill a high-ticket offer at the volume you need. You\'re building authority without building a path from audience to buyer.',
    missing: [
      'A way to capture your audience before the algorithm loses them',
      'An entry offer that converts followers into paying clients at a lower commitment',
      'A bridge between your content and your high-ticket offer',
    ],
    cost: 'Great content with no conversion path means you\'re building an audience, not a business.',
    unlock: 'Add a capture mechanism and entry offer and your existing content starts converting instead of just impressing.',
  },
  invisible_funnel: {
    label: 'Invisible Funnel',
    headline: 'Revenue is happening. You just can\'t replicate it deliberately.',
    why: 'Clients are coming from multiple places — which sounds good until you realize you can\'t double down on what\'s working because you don\'t know which channel is actually driving the conversions.',
    missing: [
      'A primary acquisition channel you intentionally invest in',
      'Clarity on which offers convert and through which path',
      'A system that makes your best-converting path repeatable and scalable',
    ],
    cost: 'Random revenue is fragile revenue. You can\'t scale what you can\'t see.',
    unlock: 'When you know which path converts, you can put more fuel behind it and predictably grow.',
  },
  pricing_misalignment: {
    label: 'Pricing Misalignment',
    headline: 'It\'s not that people won\'t pay. It\'s that your structure isn\'t justifying the price.',
    why: 'When revenue dips, you start questioning your pricing — but price is rarely the real problem. The real problem is that your offer architecture doesn\'t build enough perceived value before the ask.',
    missing: [
      'Entry offers that create investment before the big ask',
      'A bridge that lets buyers experience your method before committing to the full price',
      'Market positioning that makes your price feel like the obvious tier, not a gamble',
    ],
    cost: 'Discounting solves the symptom and destroys the margin. It doesn\'t fix the underlying structure.',
    unlock: 'When your offer ecosystem builds value progressively, your price stops being a question.',
  },
  no_bridge_offer: {
    label: 'Missing Bridge Offer',
    headline: 'People are buying. They\'re just not staying.',
    why: 'There\'s a gap in your offer stack between entry-level and your core offer. Buyers who aren\'t ready to go all-in have nowhere to go — so they leave instead of stepping forward.',
    missing: [
      'A mid-tier offer that catches people who are interested but not ready',
      'A way to deliver a transformation at a lower commitment that builds trust for the bigger one',
      'A clear progression that moves buyers from curious to committed',
    ],
    cost: 'Without a bridge, you\'re leaving money from interested-but-not-ready buyers completely on the table.',
    unlock: 'A bridge offer captures buyers at every stage of readiness — not just the ones ready to go all-in today.',
  },
}

// ── STYLES ────────────────────────────────────────────────────
const s = {
  wrap: {
    minHeight: '100vh',
    background: C.tealDark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: "'Jost', sans-serif",
  },
  card: {
    background: C.cream,
    maxWidth: 580,
    width: '100%',
    padding: 0,
    overflow: 'hidden',
  },
  cardHeader: {
    background: C.teal,
    padding: '28px 36px',
  },
  eyebrow: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 10,
    letterSpacing: 4,
    color: C.gold,
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  cardTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 600,
    color: C.white,
    lineHeight: 1.2,
  },
  cardBody: {
    padding: '36px',
  },
  question: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    fontWeight: 600,
    color: C.teal,
    lineHeight: 1.3,
    marginBottom: 28,
  },
  answerBtn: {
    width: '100%',
    padding: '14px 20px',
    marginBottom: 10,
    background: C.white,
    border: `1px solid #E8D5B5`,
    borderLeft: `3px solid transparent`,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: "'Jost', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    color: C.text,
    lineHeight: 1.5,
    transition: 'all 0.15s',
    display: 'block',
  },
  answerBtnSelected: {
    borderLeft: `3px solid ${C.gold}`,
    background: '#F9F3EB',
    color: C.teal,
    fontWeight: 500,
  },
  progress: {
    display: 'flex',
    gap: 6,
    marginBottom: 28,
  },
  progressDot: (active, done) => ({
    height: 3,
    flex: 1,
    background: done ? C.gold : active ? C.teal : '#D8CCB8',
    transition: 'background 0.3s',
  }),
  nextBtn: {
    marginTop: 8,
    padding: '14px 32px',
    background: C.gold,
    color: C.tealDark,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    float: 'right',
  },
  nextBtnDisabled: {
    background: '#D8CCB8',
    cursor: 'not-allowed',
    color: '#999',
  },
  analyzing: {
    textAlign: 'center',
    padding: '48px 36px',
  },
  spinner: {
    width: 48,
    height: 48,
    border: `3px solid #E8D5B5`,
    borderTop: `3px solid ${C.gold}`,
    borderRadius: '50%',
    margin: '0 auto 24px',
    animation: 'spin 1s linear infinite',
  },
  analyzingTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 600,
    color: C.teal,
    marginBottom: 10,
  },
  analyzingText: {
    fontSize: 15,
    fontWeight: 300,
    color: C.textLight,
    lineHeight: 1.7,
  },
  gateWrap: {
    padding: '36px',
  },
  gateHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 600,
    color: C.teal,
    lineHeight: 1.3,
    marginBottom: 10,
  },
  gateSub: {
    fontSize: 15,
    fontWeight: 300,
    color: C.textLight,
    lineHeight: 1.7,
    marginBottom: 28,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: `1px solid #E8D5B5`,
    background: C.white,
    fontFamily: "'Jost', sans-serif",
    fontSize: 15,
    color: C.text,
    marginBottom: 10,
    outline: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '16px',
    background: C.gold,
    color: C.tealDark,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  errorText: {
    color: '#CC4444',
    fontSize: 13,
    marginBottom: 8,
  },
  resultHeader: {
    background: C.teal,
    padding: '28px 36px',
  },
  gapBadge: {
    display: 'inline-block',
    background: C.gold,
    color: C.tealDark,
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    padding: '4px 12px',
    marginBottom: 12,
  },
  resultHeadline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    fontWeight: 700,
    color: C.white,
    lineHeight: 1.25,
  },
  resultBody: {
    padding: '32px 36px',
  },
  resultSection: {
    marginBottom: 24,
  },
  resultLabel: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    letterSpacing: 3,
    color: C.gold,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 15,
    fontWeight: 300,
    color: C.text,
    lineHeight: 1.8,
  },
  missingItem: {
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  missingDot: {
    width: 20,
    height: 20,
    background: C.teal,
    color: C.gold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    fontWeight: 700,
    flexShrink: 0,
    marginTop: 2,
  },
  divider: {
    border: 'none',
    borderTop: `1px solid #E8D5B5`,
    margin: '24px 0',
  },
  ctaBox: {
    background: C.teal,
    padding: '28px 32px',
    margin: '0 -0px',
    textAlign: 'center',
  },
  ctaLabel: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 9,
    letterSpacing: 3,
    color: C.goldLight,
    fontWeight: 700,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  ctaHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 600,
    color: C.white,
    lineHeight: 1.3,
    marginBottom: 20,
  },
  ctaBtn: {
    display: 'inline-block',
    background: C.gold,
    color: C.tealDark,
    padding: '14px 36px',
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
  },
  ctaSub: {
    marginTop: 12,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: 300,
  },
  footer: {
    background: C.tealDark,
    padding: '16px 36px',
    textAlign: 'center',
  },
  footerText: {
    fontFamily: "'Jost', sans-serif",
    fontSize: 11,
    color: '#557777',
    letterSpacing: 1,
  },
  footerSpan: {
    color: C.gold,
  },
}

// ── WEBHOOK ───────────────────────────────────────────────────
const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/UZr1TlEpzFnDyRtlKL1z/webhook-trigger/595e58bb-9156-42e5-b7b5-adfdc25ad91b'

async function sendToGHL(firstName, email, gapType) {
  const gap = GAP_CONTENT[gapType]
  try {
    await fetch(GHL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        first_name: firstName,
        diagnostic_gap_type: gapType,
        diagnostic_gap_label: gap.label,
        diagnostic_headline: gap.headline,
        diagnostic_completed_date: new Date().toISOString(),
        tags: [`diag_result_${gapType}`, 'diag_completed'],
      }),
    })
  } catch (e) {
    console.error('Webhook error:', e)
  }
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [step, setStep]           = useState('intro')      // intro | questions | analyzing | gate | results
  const [qIndex, setQIndex]       = useState(0)
  const [answers, setAnswers]     = useState({})
  const [selected, setSelected]   = useState(null)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState('')
  const [gapType, setGapType]     = useState(null)

  const q = QUESTIONS[qIndex]

  function handleAnswer(value) {
    setSelected(value)
  }

  function handleNext() {
    if (!selected) return
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      const detected = detectGap(newAnswers)
      setGapType(detected)
      setStep('analyzing')
      setTimeout(() => setStep('gate'), 2800)
    }
  }

  async function handleGateSubmit() {
    setError('')
    if (!firstName.trim()) { setError('Please enter your first name.'); return }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email address.'); return }
    setSubmitting(true)
    await sendToGHL(firstName.trim(), email.trim(), gapType)
    setSubmitting(false)
    setStep('results')
  }

  const gap = gapType ? GAP_CONTENT[gapType] : null

  return (
    <div style={s.wrap}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover { opacity: 0.9; }
      `}</style>

      <div style={s.card}>

        {/* ── INTRO ── */}
        {step === 'intro' && (
          <>
            <div style={s.cardHeader}>
              <div style={s.eyebrow}>Offer Map Method™</div>
              <div style={s.cardTitle}>Find the gap that's costing you revenue.</div>
            </div>
            <div style={s.cardBody}>
              <p style={{ ...s.resultText, marginBottom: 20 }}>
                Answer 5 quick questions about your business. We'll identify the exact structural gap holding your revenue back — and tell you what it's costing you.
              </p>
              <p style={{ ...s.resultText, marginBottom: 32, color: C.textLight }}>
                Takes about 90 seconds.
              </p>
              <button style={s.nextBtn} onClick={() => setStep('questions')}>
                Start the Diagnostic →
              </button>
              <div style={{ clear: 'both' }} />
            </div>
            <div style={s.footer}>
              <span style={s.footerText}>Priddy Impact Group &nbsp;·&nbsp; <span style={s.footerSpan}>Offer Map Method™</span></span>
            </div>
          </>
        )}

        {/* ── QUESTIONS ── */}
        {step === 'questions' && (
          <>
            <div style={s.cardHeader}>
              <div style={s.eyebrow}>Question {qIndex + 1} of {QUESTIONS.length}</div>
              <div style={s.cardTitle}>Offer Map Diagnostic</div>
            </div>
            <div style={s.cardBody}>
              <div style={s.progress}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={s.progressDot(i === qIndex, i < qIndex)} />
                ))}
              </div>
              <div style={s.question}>{q.question}</div>
              {q.answers.map(a => (
                <button
                  key={a.value}
                  style={{
                    ...s.answerBtn,
                    ...(selected === a.value ? s.answerBtnSelected : {}),
                  }}
                  onClick={() => handleAnswer(a.value)}
                >
                  {a.label}
                </button>
              ))}
              <div style={{ marginTop: 24, overflow: 'hidden' }}>
                <button
                  style={{
                    ...s.nextBtn,
                    ...(selected ? {} : s.nextBtnDisabled),
                  }}
                  onClick={handleNext}
                  disabled={!selected}
                >
                  {qIndex < QUESTIONS.length - 1 ? 'Next →' : 'See My Results →'}
                </button>
              </div>
            </div>
            <div style={s.footer}>
              <span style={s.footerText}>Priddy Impact Group &nbsp;·&nbsp; <span style={s.footerSpan}>Offer Map Method™</span></span>
            </div>
          </>
        )}

        {/* ── ANALYZING ── */}
        {step === 'analyzing' && (
          <>
            <div style={s.cardHeader}>
              <div style={s.eyebrow}>Offer Map Method™</div>
              <div style={s.cardTitle}>Analyzing your answers...</div>
            </div>
            <div style={s.analyzing}>
              <div style={s.spinner} />
              <div style={s.analyzingTitle}>Reading your offer structure</div>
              <p style={s.analyzingText}>Mapping your answers against the Offer Map Method™ framework to identify your structural gap.</p>
            </div>
            <div style={s.footer}>
              <span style={s.footerText}>Priddy Impact Group &nbsp;·&nbsp; <span style={s.footerSpan}>Offer Map Method™</span></span>
            </div>
          </>
        )}

        {/* ── EMAIL GATE ── */}
        {step === 'gate' && (
          <>
            <div style={s.cardHeader}>
              <div style={s.eyebrow}>Your results are ready</div>
              <div style={s.cardTitle}>We found your gap.</div>
            </div>
            <div style={s.gateWrap}>
              <div style={s.gateHeading}>Where should we send your full diagnosis?</div>
              <p style={s.gateSub}>Enter your name and email to see your results — plus what this gap is costing you and what fixing it unlocks.</p>
              {error && <div style={s.errorText}>{error}</div>}
              <input
                style={s.input}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input
                style={s.input}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                style={{ ...s.submitBtn, opacity: submitting ? 0.7 : 1 }}
                onClick={handleGateSubmit}
                disabled={submitting}
              >
                {submitting ? 'Loading...' : 'Show My Results →'}
              </button>
              <p style={{ marginTop: 12, fontSize: 12, color: C.textLight, textAlign: 'center', fontWeight: 300 }}>
                No spam. Just your diagnosis and one recommendation.
              </p>
            </div>
            <div style={s.footer}>
              <span style={s.footerText}>Priddy Impact Group &nbsp;·&nbsp; <span style={s.footerSpan}>Offer Map Method™</span></span>
            </div>
          </>
        )}

        {/* ── RESULTS ── */}
        {step === 'results' && gap && (
          <>
            <div style={s.resultHeader}>
              <div style={s.gapBadge}>Your Gap Identified</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: C.goldLight, marginBottom: 6, fontWeight: 600, letterSpacing: 1 }}>{gap.label}</div>
              <div style={s.resultHeadline}>{gap.headline}</div>
            </div>
            <div style={s.resultBody}>

              <div style={s.resultSection}>
                <div style={s.resultLabel}>Why your revenue looks this way</div>
                <div style={s.resultText}>{gap.why}</div>
              </div>

              <hr style={s.divider} />

              <div style={s.resultSection}>
                <div style={s.resultLabel}>What's structurally missing</div>
                {gap.missing.map((item, i) => (
                  <div key={i} style={s.missingItem}>
                    <div style={s.missingDot}>{i + 1}</div>
                    <div style={s.resultText}>{item}</div>
                  </div>
                ))}
              </div>

              <hr style={s.divider} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div style={{ padding: 16, borderTop: '2px solid #CC4444', background: '#FFF5F5' }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', color: '#CC4444', marginBottom: 6 }}>Cost of leaving this open</div>
                  <div style={{ fontSize: 13, fontWeight: 300, color: C.text, lineHeight: 1.65 }}>{gap.cost}</div>
                </div>
                <div style={{ padding: 16, borderTop: '2px solid #2A8A4A', background: '#F5FFF8' }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, fontWeight: 700, textTransform: 'uppercase', color: '#2A8A4A', marginBottom: 6 }}>What fixing it unlocks</div>
                  <div style={{ fontSize: 13, fontWeight: 300, color: C.text, lineHeight: 1.65 }}>{gap.unlock}</div>
                </div>
              </div>

            </div>

            <div style={s.ctaBox}>
              <div style={s.ctaLabel}>Ready to close this gap?</div>
              <div style={s.ctaHeading}>The Offer Map Intensive builds your architecture from evidence — in one session.</div>
              <a
                href="https://priddyimpactgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                style={s.ctaBtn}
              >
                Book the Intensive — $497
              </a>
              <div style={s.ctaSub}>One session. Research-backed. Your complete Offer Map delivered.</div>
            </div>

            <div style={s.footer}>
              <span style={s.footerText}>Priddy Impact Group &nbsp;·&nbsp; <span style={s.footerSpan}>Offer Map Method™</span></span>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
