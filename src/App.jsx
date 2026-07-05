import { useState } from "react";

// ═══ 인라인 직사각형 국기 (3:2 비율 · 150x100 뷰박스) ═══════
const star = (cx, cy, r, fill) => {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const rad = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r * 0.4;
    pts.push(`${cx + rr * Math.cos(rad)},${cy + rr * Math.sin(rad)}`);
  }
  return <polygon points={pts.join(" ")} fill={fill} />;
};

const FLAG_ART = {
  ar: <><rect width="150" height="100" fill="#74ACDF" /><rect y="33" width="150" height="34" fill="#fff" /><circle cx="75" cy="50" r="9" fill="#F6B40E" /></>,
  es: <><rect width="150" height="100" fill="#AA151B" /><rect y="25" width="150" height="50" fill="#F1BF00" /></>,
  fr: <><rect width="50" height="100" fill="#002395" /><rect x="50" width="50" height="100" fill="#fff" /><rect x="100" width="50" height="100" fill="#ED2939" /></>,
  "gb-eng": <><rect width="150" height="100" fill="#fff" /><rect x="65" width="20" height="100" fill="#C8102E" /><rect y="40" width="150" height="20" fill="#C8102E" /></>,
  br: <><rect width="150" height="100" fill="#009739" /><polygon points="75,12 138,50 75,88 12,50" fill="#FEDD00" /><circle cx="75" cy="50" r="18" fill="#012169" /></>,
  pt: <><rect width="60" height="100" fill="#046A38" /><rect x="60" width="90" height="100" fill="#DA291C" /><circle cx="60" cy="50" r="14" fill="#FFE900" /><circle cx="60" cy="50" r="8" fill="#DA291C" /></>,
  be: <><rect width="50" height="100" fill="#000" /><rect x="50" width="50" height="100" fill="#FDDA24" /><rect x="100" width="50" height="100" fill="#EF3340" /></>,
  ma: <><rect width="150" height="100" fill="#C1272D" />{star(75, 52, 26, "#006233")}<circle cx="75" cy="52" r="8" fill="#C1272D" /></>,
  mx: <><rect width="50" height="100" fill="#006847" /><rect x="50" width="50" height="100" fill="#fff" /><rect x="100" width="50" height="100" fill="#CE1126" /><circle cx="75" cy="50" r="10" fill="#8C6D3F" /></>,
  co: <><rect width="150" height="50" fill="#FCD116" /><rect y="50" width="150" height="25" fill="#003893" /><rect y="75" width="150" height="25" fill="#CE1126" /></>,
  us: <><rect width="150" height="100" fill="#fff" />{[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={i * 7.7} width="150" height="7.7" fill="#B31942" />)}<rect width="60" height="54" fill="#0A3161" /><circle cx="12" cy="11" r="3.4" fill="#fff" /><circle cx="30" cy="11" r="3.4" fill="#fff" /><circle cx="48" cy="11" r="3.4" fill="#fff" /><circle cx="21" cy="27" r="3.4" fill="#fff" /><circle cx="39" cy="27" r="3.4" fill="#fff" /><circle cx="12" cy="43" r="3.4" fill="#fff" /><circle cx="30" cy="43" r="3.4" fill="#fff" /><circle cx="48" cy="43" r="3.4" fill="#fff" /></>,
  ch: <><rect width="150" height="100" fill="#DA291C" /><rect x="65" y="22" width="20" height="56" fill="#fff" /><rect x="47" y="40" width="56" height="20" fill="#fff" /></>,
  no: <><rect width="150" height="100" fill="#BA0C2F" /><rect x="38" width="26" height="100" fill="#fff" /><rect y="37" width="150" height="26" fill="#fff" /><rect x="44.5" width="13" height="100" fill="#00205B" /><rect y="43.5" width="150" height="13" fill="#00205B" /></>,
  ca: <><rect width="150" height="100" fill="#fff" /><rect width="38" height="100" fill="#D80621" /><rect x="112" width="38" height="100" fill="#D80621" /><path d="M75 22 L79 33 88 29 84 40 96 42 86 51 92 62 79 57 77 74 73 74 71 57 58 62 64 51 54 42 66 40 62 29 71 33 Z" fill="#D80621" /></>,
  eg: <><rect width="150" height="34" fill="#CE1126" /><rect y="34" width="150" height="33" fill="#fff" /><rect y="67" width="150" height="33" fill="#000" /><circle cx="75" cy="50" r="10" fill="#C09300" /></>,
  py: <><rect width="150" height="34" fill="#D52B1E" /><rect y="34" width="150" height="33" fill="#fff" /><rect y="67" width="150" height="33" fill="#0038A8" /><circle cx="75" cy="50" r="9" fill="none" stroke="#7B9B4E" strokeWidth="3.5" /></>,
  gh: <><rect width="150" height="34" fill="#CE1126" /><rect y="34" width="150" height="33" fill="#FCD116" /><rect y="67" width="150" height="33" fill="#006B3F" />{star(75, 50, 17, "#000")}</>,
  cv: <><rect width="150" height="100" fill="#003893" /><rect y="55" width="150" height="8" fill="#fff" /><rect y="63" width="150" height="8" fill="#CF2027" /><rect y="71" width="150" height="8" fill="#fff" />{star(55, 63, 10, "#F7D116")}</>,
};

function FlagDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        {Object.entries(FLAG_ART).map(([code, art]) => (
          <g key={code} id={`flag-${code}`}>{art}</g>
        ))}
      </defs>
    </svg>
  );
}

// ═══ 팀 데이터 ═══════════════════════════════════════════════
const T = {
  ARG: { c: "ar", n: "아르헨티나", r: 1 },
  ESP: { c: "es", n: "스페인", r: 2 },
  FRA: { c: "fr", n: "프랑스", r: 3 },
  ENG: { c: "gb-eng", n: "잉글랜드", r: 4 },
  BRA: { c: "br", n: "브라질", r: 5 },
  POR: { c: "pt", n: "포르투갈", r: 6 },
  BEL: { c: "be", n: "벨기에", r: 8 },
  MAR: { c: "ma", n: "모로코", r: 11 },
  MEX: { c: "mx", n: "멕시코", r: 12 },
  COL: { c: "co", n: "콜롬비아", r: 13 },
  USA: { c: "us", n: "미국", r: 14 },
  SUI: { c: "ch", n: "스위스", r: 17 },
  NOR: { c: "no", n: "노르웨이", r: 22 },
  CAN: { c: "ca", n: "캐나다", r: 28 },
  EGY: { c: "eg", n: "이집트", r: 33 },
  PAR: { c: "py", n: "파라과이", r: 37 },
  GHA: { c: "gh", n: "가나", r: 68 },
  CPV: { c: "cv", n: "카보베르데", r: 70 },
};

const SLOTS = [
  ["PAR"], ["FRA"], ["CAN"], ["MAR"],
  ["ESP"], ["POR"], ["BEL"], ["USA"],
  ["BRA"], ["NOR"], ["MEX"], ["ENG"],
  ["EGY"], ["ARG"], ["SUI"], ["COL"],
];

const R16_SCHED = [
  { kst: "7/5 (일) 06:00", city: "필라델피아" },
  { kst: "7/5 (일) 02:00", city: "휴스턴" },
  { kst: "7/7 (화) 04:00", city: "댈러스" },
  { kst: "7/7 (화) 09:00", city: "시애틀" },
  { kst: "7/6 (월) 05:00", city: "뉴저지" },
  { kst: "7/6 (월) 09:00", city: "멕시코시티" },
  { kst: "7/8 (수) 01:00", city: "애틀랜타" },
  { kst: "7/8 (수) 05:00", city: "밴쿠버" },
];
const QF_SCHED = [
  { kst: "7/10 (금) 05:00", city: "보스턴" },
  { kst: "7/11 (토) 04:00", city: "LA" },
  { kst: "7/12 (일) 06:00", city: "마이애미" },
  { kst: "7/12 (일) 10:00", city: "캔자스시티" },
];
const SF_SCHED = [
  { kst: "7/15 (수) 04:00", city: "댈러스" },
  { kst: "7/16 (목) 04:00", city: "애틀랜타" },
];
const FIN_SCHED = { kst: "7/20 (월) 04:00", city: "뉴저지" };

// ═══ 경기 결과 ═══════════════════════════════════════════════
// 16강 매치 인덱스(i>>1) → { win: 승자 코드, score: [승자 득점, 상대 득점], goals: [득점자 문자열] }.
// 경기가 끝나면 여기에 추가한다.
const R16_RESULTS = {
  0: { win: "FRA", score: [1, 0], goals: ["음바페 70' (PK)"] },
  1: { win: "MAR", score: [3, 0], goals: ["오나히 50'·82'", "라히미 90+'"] },
  4: { win: "NOR", score: [2, 1], goals: ["홀란 80'·86'"] },
};

// 진 팀(탈락) 코드 집합
const ELIMINATED = new Set(
  Object.entries(R16_RESULTS).map(([m, r]) => {
    const a = SLOTS[m * 2][0], b = SLOTS[m * 2 + 1][0];
    return r.win === a ? b : a;
  })
);
// 8강 자리(매치 인덱스) → 진출한 승자 팀 코드 (없으면 null)
const qfWinner = (m) => R16_RESULTS[m]?.win || null;

const C = {
  bg: "#0A0A0C", card: "#141419", faint: "#1F1F26",
  line: "#3A3A46", dim: "#5C5C66", bright: "#F5F5F7", gold: "#F2C14E",
};

const CODE = { ARG:"ARG", ESP:"ESP", FRA:"FRA", ENG:"ENG", BRA:"BRA", POR:"POR", BEL:"BEL", MAR:"MAR", MEX:"MEX", COL:"COL", USA:"USA", SUI:"SUI", NOR:"NOR", CAN:"CAN", EGY:"EGY", PAR:"PAR", GHA:"GHA", CPV:"CPV" };

function pathOpponents(i) {
  const byRank = (arr) => [...arr].sort((a, b) => T[a].r - T[b].r);
  const opp16 = SLOTS[i ^ 1];
  const sib = (i >> 1) ^ 1;
  const sibWin = R16_RESULTS[sib]?.win;
  const oppQF = sibWin ? [sibWin] : byRank([SLOTS[sib * 2], SLOTS[sib * 2 + 1]].flat());
  const oq = (i >> 2) ^ 1;
  const oppSF = byRank([0, 1, 2, 3].map((k) => SLOTS[oq * 4 + k]).flat());
  const half = i < 8 ? [8, 16] : [0, 8];
  const oppF = byRank(SLOTS.slice(...half).flat());
  const r16 = R16_RESULTS[i >> 1];
  return [
    { round: "16강", opps: opp16, fixed: opp16.length === 1, sched: R16_SCHED[i >> 1], done: !!r16, score: r16?.score, goals: r16?.goals },
    { round: "8강", opps: oppQF, fixed: !!sibWin, sched: QF_SCHED[i >> 2] },
    { round: "4강", opps: oppSF, fixed: false, sched: SF_SCHED[i >> 3] },
    { round: "결승", opps: oppF, fixed: false, sched: FIN_SCHED },
  ];
}

// ═══ 좌표 ════════════════════════════════════════════════════
const CX = 500, CY = 505;
const polar = (r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
};
const arcLink = (cDeg, cR, pDeg, pR) => {
  const [x1, y1] = polar(cR, cDeg);
  const [x2, y2] = polar(pR, cDeg);
  const [x3, y3] = polar(pR, pDeg);
  const sweep = ((pDeg - cDeg + 540) % 360) > 180 ? 0 : 1;
  return `M ${x1} ${y1} L ${x2} ${y2} A ${pR} ${pR} 0 0 ${sweep} ${x3} ${y3}`;
};
const mid = (a, b) => (a + b) / 2;

const D0 = Array.from({ length: 16 }, (_, i) => ((i + 0.5) / 16) * 360);
const D1 = Array.from({ length: 8 }, (_, i) => mid(D0[2 * i], D0[2 * i + 1]));
const D2 = Array.from({ length: 4 }, (_, i) => mid(D1[2 * i], D1[2 * i + 1]));
const D3 = Array.from({ length: 2 }, (_, i) => mid(D2[2 * i], D2[2 * i + 1]));
const R0 = 398, R1 = 264, R2 = 176, R3 = 102;

const mono = { fontFamily: "'SF Mono', ui-monospace, Menlo, monospace" };
const nowrap = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };

// HTML용 직사각형 미니 국기
function Flag({ code, w = 24, style }) {
  const h = Math.round((w * 2) / 3);
  return (
    <svg width={w} height={h} viewBox="0 0 150 100"
      style={{ borderRadius: 3, verticalAlign: "middle", flexShrink: 0, display: "inline-block", ...style }}>
      <use href={`#flag-${T[code].c}`} />
    </svg>
  );
}

// ═══ 브래킷 팀 노드 3가지 스타일 ═════════════════════════════
// style 0: 코드 / 1: 국기 / 2: 국기+코드
function TeamNode({ x, y, slot, styleMode, active, isOpp, faded, eliminated, onClick }) {
  const dual = slot.length > 1;
  const common = {
    className: "node",
    style: {
      cursor: eliminated ? "default" : "pointer",
      opacity: eliminated ? 0.4 : faded ? 0.18 : 1,
      transform: active ? "scale(1.18)" : isOpp ? "scale(1.08)" : "scale(1)",
    },
    onClick: eliminated ? undefined : onClick,
  };
  const glow = (active || isOpp) && <circle cx={x} cy={y} r={58} fill="url(#glowGold)" />;
  const hit = <circle cx={x} cy={y} r={54} fill="transparent" />;

  if (styleMode === 0) {
    // A. 코드 칩
    const label = dual ? `${CODE[slot[0]]}/${CODE[slot[1]]}` : CODE[slot[0]];
    const w = dual ? 104 : 74, h = 40;
    return (
      <g {...common}>
        {glow}{hit}
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={11}
          fill={C.card} stroke={active || isOpp ? C.gold : C.line}
          strokeWidth={active ? 2.5 : 1.5}
          strokeDasharray={dual ? "5 5" : "none"} />
        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize={dual ? 17 : 22} fontWeight="800"
          fill={active || isOpp ? C.gold : C.bright}
          fontFamily="'SF Mono', ui-monospace, Menlo, monospace">
          {label}
        </text>
      </g>
    );
  }

  const fw = styleMode === 1 ? 80 : 60;
  const fh = Math.round((fw * 2) / 3);
  if (styleMode === 1) {
    // B. 직사각형 국기
    return (
      <g {...common}>
        {glow}{hit}
        {dual ? (
          <>
            <g style={{ filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.5))" }}>
              <svg x={x - 48} y={y - 29} width={60} height={40} viewBox="0 0 150 100"><use href={`#flag-${T[slot[0]].c}`} /></svg>
            </g>
            <g style={{ filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.5))" }} opacity="0.92">
              <svg x={x - 9} y={y - 9} width={56} height={37} viewBox="0 0 150 100"><use href={`#flag-${T[slot[1]].c}`} /></svg>
            </g>
          </>
        ) : (
          <g style={{ filter: "drop-shadow(0 4px 9px rgba(0,0,0,0.55))" }}>
            <svg x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} viewBox="0 0 150 100">
              <use href={`#flag-${T[slot[0]].c}`} />
            </svg>
            <rect x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} rx={5}
              fill="none" stroke={active || isOpp ? C.gold : "rgba(255,255,255,0.14)"}
              strokeWidth={active ? 2.5 : 1} />
          </g>
        )}
        {eliminated && (
          <line x1={x - fw / 2} y1={y + fh / 2} x2={x + fw / 2} y2={y - fh / 2}
            stroke="#E5484D" strokeWidth={3} strokeLinecap="round" />
        )}
      </g>
    );
  }

  // C. 국기 + 코드
  return (
    <g {...common}>
      {glow}{hit}
      {dual ? (
        <>
          <svg x={x - 42} y={y - 26} width={46} height={31} viewBox="0 0 150 100"><use href={`#flag-${T[slot[0]].c}`} /></svg>
          <svg x={x - 4} y={y - 14} width={42} height={28} viewBox="0 0 150 100" opacity="0.92"><use href={`#flag-${T[slot[1]].c}`} /></svg>
          <text x={x} y={y + 30} textAnchor="middle" fontSize="13" fontWeight="800"
            fill={C.dim} fontFamily="'SF Mono', ui-monospace, Menlo, monospace">
            {CODE[slot[0]]}/{CODE[slot[1]]}
          </text>
        </>
      ) : (
        <>
          <g style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.5))" }}>
            <svg x={x - fw / 2} y={y - fh / 2 - 8} width={fw} height={fh} viewBox="0 0 150 100">
              <use href={`#flag-${T[slot[0]].c}`} />
            </svg>
            <rect x={x - fw / 2} y={y - fh / 2 - 8} width={fw} height={fh} rx={5}
              fill="none" stroke={active || isOpp ? C.gold : "rgba(255,255,255,0.14)"}
              strokeWidth={active ? 2.5 : 1} />
          </g>
          <text x={x} y={y + fh / 2 + 8} textAnchor="middle" fontSize="15" fontWeight="800"
            fill={active || isOpp ? C.gold : C.bright}
            fontFamily="'SF Mono', ui-monospace, Menlo, monospace">
            {CODE[slot[0]]}
          </text>
        </>
      )}
    </g>
  );
}

// ═══ 메인 ════════════════════════════════════════════════════
export default function PathBracketV7() {
  const [sel, setSel] = useState(null);
  const styleMode = 1; // B. 직사각형 국기 (확정)

  const steps = sel !== null ? pathOpponents(sel) : null;
  const selTeam = sel !== null ? SLOTS[sel][0] : null;
  // 이미 이긴(끝난) 라운드 수 → 우승까지 남은 경기
  const remaining = sel !== null ? 4 - steps.filter((st) => st.done).length : 4;

  const segs = sel !== null ? [
    { d: arcLink(D0[sel], R0 - 54, D1[sel >> 1], R1), fixed: steps[0].fixed },
    { d: arcLink(D1[sel >> 1], R1, D2[sel >> 2], R2), fixed: steps[1].fixed },
    { d: arcLink(D2[sel >> 2], R2, D3[sel >> 3], R3), fixed: false },
    { d: `M ${polar(R3, D3[sel >> 3])[0]} ${polar(R3, D3[sel >> 3])[1]} L ${CX} ${CY}`, fixed: false },
  ] : [];

  const onPath = (ring, idx) =>
    sel === null ? false :
    ring === 1 ? idx === sel >> 1 :
    ring === 2 ? idx === sel >> 2 :
    idx === sel >> 3;

  return (
    <div style={{
      minHeight: "100vh", background: C.bg, color: C.bright,
      fontFamily: "'Pretendard', 'Apple SD Gothic Neo', system-ui, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "16px 6px 34px",
    }}>
      <FlagDefs />
      <style>{`
        @keyframes flowDash { to { stroke-dashoffset: -30; } }
        .flow { animation: flowDash 1.8s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .flow { animation: none; } }
        .node { transition: opacity 0.35s ease, transform 0.35s ease; transform-box: fill-box; transform-origin: center; }
      `}</style>

      <div style={{
        fontSize: 11, letterSpacing: "0.35em", color: C.dim,
        ...mono, marginBottom: 14,
      }}>FIFA WORLD CUP 26 · KNOCKOUT</div>

      {/* 헤더 */}
      <div style={{
        minHeight: 48, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 7,
        marginBottom: 4,
      }}>
        {sel === null ? (
          <>
            <span style={{ fontSize: 18, fontWeight: 800, color: C.bright, letterSpacing: "-0.01em" }}>
              다음 상대가 궁금한 팀을 눌러보세요
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 12.5, color: C.dim }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="26" height="4"><line x1="0" y1="2" x2="26" y2="2" stroke={C.gold} strokeWidth="3.5" strokeLinecap="round" /></svg>
              확정
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width="26" height="4"><line x1="1" y1="2" x2="26" y2="2" stroke={C.gold} strokeWidth="3" strokeLinecap="round" strokeDasharray="1.5 6" /></svg>
              예상
            </span>
          </span>
          </>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <Flag code={selTeam} w={27} />
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>
              {T[selTeam].n} <span style={{ color: C.dim, fontWeight: 600 }}>·</span>{" "}
              우승까지 <span style={{ color: C.gold }}>{remaining}경기</span>
            </span>
          </span>
        )}
      </div>

      <svg viewBox="0 44 1000 924" style={{ width: "100%", maxWidth: 680 }}
        onClick={(e) => { if (e.target.tagName === "svg") setSel(null); }}>
        <defs>
          <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.gold} stopOpacity="0.30" />
            <stop offset="70%" stopColor={C.gold} stopOpacity="0.07" />
            <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowSoft" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={300} fill="url(#glowSoft)" />

        {D0.map((d, i) => (
          <path key={`b0${i}`} d={arcLink(d, R0 - 54, D1[i >> 1], R1)} fill="none"
            stroke={C.line} strokeWidth={1.8} />
        ))}
        {D1.map((d, i) => (
          <path key={`b1${i}`} d={arcLink(d, R1, D2[i >> 1], R2)} fill="none"
            stroke={C.line} strokeWidth={1.3} opacity={0.75} />
        ))}
        {D2.map((d, i) => (
          <path key={`b2${i}`} d={arcLink(d, R2, D3[i >> 1], R3)} fill="none"
            stroke={C.line} strokeWidth={1.3} opacity={0.75} />
        ))}
        {D3.map((d, i) => (
          <path key={`b3${i}`} d={`M ${polar(R3, d)[0]} ${polar(R3, d)[1]} L ${CX} ${CY}`} fill="none"
            stroke={C.line} strokeWidth={1.3} opacity={0.75} />
        ))}

        {segs.map((s, i) => (
          <path key={`s${i}`} d={s.d} fill="none" stroke={C.gold}
            className={s.fixed ? "" : "flow"}
            strokeWidth={s.fixed ? 4.5 : 3}
            strokeLinecap="round"
            strokeDasharray={s.fixed ? "none" : "2 13"}
            style={{ filter: `drop-shadow(0 0 5px ${C.gold}55)` }} />
        ))}

        {[[D1, R1, 1], [D2, R2, 2], [D3, R3, 3]].map(([D, R, ring]) =>
          D.map((d, i) => {
            const [x, y] = polar(R, d);
            const hot = onPath(ring, i);
            const winner = ring === 1 ? qfWinner(i) : null;
            if (winner) {
              const fw = 46, fh = 31;
              return (
                <g key={`j${ring}-${i}`}
                  style={{ opacity: sel === null ? 1 : hot ? 1 : 0.4, transition: "opacity .35s ease" }}>
                  <g style={{ filter: "drop-shadow(0 3px 7px rgba(0,0,0,0.5))" }}>
                    <svg x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} viewBox="0 0 150 100">
                      <use href={`#flag-${T[winner].c}`} />
                    </svg>
                    <rect x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} rx={5}
                      fill="none" stroke={hot ? C.gold : "rgba(242,193,78,0.6)"}
                      strokeWidth={hot ? 2.5 : 1.4} />
                  </g>
                </g>
              );
            }
            return (
              <circle key={`j${ring}-${i}`} cx={x} cy={y}
                r={hot ? 6 : ring === 1 ? 5.5 : 4.5}
                fill={hot ? C.gold : C.line}
                opacity={sel === null ? 0.95 : hot ? 1 : 0.3}
                style={{ transition: "opacity .35s ease" }} />
            );
          })
        )}

        {SLOTS.map((slot, i) => {
          const [x, y] = polar(R0, D0[i]);
          const out = ELIMINATED.has(slot[0]);
          return (
            <TeamNode key={`t${i}`} x={x} y={y} slot={slot} styleMode={styleMode}
              active={sel === i}
              isOpp={sel !== null && i === (sel ^ 1)}
              faded={sel !== null && sel !== i && i !== (sel ^ 1)}
              eliminated={out}
              onClick={() => { if (!out) setSel(sel === i ? null : i); }} />
          );
        })}

        <circle cx={CX} cy={CY} r={76} fill="url(#glowGold)"
          opacity={sel !== null ? 1 : 0.55}
          style={{ transition: "opacity .35s ease" }} />
        <text x={CX} y={CY + 4} textAnchor="middle" dominantBaseline="middle" fontSize="60"
          style={{ filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.6))" }}>🏆</text>
      </svg>

      {/* 여정 스트립 + 일정 카드 */}
      {sel !== null && (
        <div style={{
          marginTop: 12, width: "calc(100% - 28px)", maxWidth: 560,
          display: "grid", gap: 8,
        }}>
          <div style={{
            background: C.card, border: `1px solid ${C.faint}`,
            borderRadius: 16, padding: "11px 14px", boxSizing: "border-box",
            display: "flex", alignItems: "stretch", gap: 4,
          }}>
            {steps.map((st, i) => (
              <div key={i} style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", gap: 5, minWidth: 0, position: "relative",
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: "0.04em" }}>
                  {st.round}
                </div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 4,
                  height: 25, whiteSpace: "nowrap",
                }}>
                  {st.fixed
                    ? <Flag code={st.opps[0]} w={34} />
                    : st.opps.slice(0, 2).map((c) => (
                      // 좁은 화면에선 컬럼 폭(375px 기기 기준 ≈73px)에
                      // 국기 2개 + "+N" 라벨이 넘치므로 vw에 비례해 축소
                      <Flag key={c} code={c} w={31}
                        style={{ width: "min(31px, 6.4vw)", height: "min(21px, 4.3vw)" }} />
                    ))}
                  {!st.fixed && st.opps.length > 2 && (
                    <span style={{ fontSize: 12.5, color: C.dim, fontWeight: 700 }}>+{st.opps.length - 2}</span>
                  )}
                </div>
                <svg width="52" height="4">
                  <line x1="1" y1="2" x2="51" y2="2" stroke={C.gold}
                    strokeWidth={st.fixed ? 3 : 2}
                    strokeLinecap="round"
                    strokeDasharray={st.fixed ? "none" : "1.5 6"}
                    opacity={st.fixed ? 1 : 0.75} />
                </svg>
                {i < 3 && (
                  <span style={{
                    position: "absolute", right: -7, top: "44%",
                    fontSize: 13, color: C.dim,
                  }}>›</span>
                )}
              </div>
            ))}
          </div>

          {steps.map((st, i) => (
            <div key={`sch${i}`} style={{
              background: C.card,
              border: st.fixed ? `1px solid ${C.gold}55` : `1px dashed ${C.faint}`,
              borderRadius: 13, padding: "10px 14px", boxSizing: "border-box",
              display: "flex", alignItems: "center", gap: 11,
            }}>
              <span style={{
                fontSize: 12.5, fontWeight: 800, flexShrink: 0,
                color: st.fixed ? "#141418" : C.dim,
                background: st.fixed ? C.gold : "#1D1D24",
                borderRadius: 8, padding: "5px 10px", letterSpacing: "0.02em",
              }}>{st.round}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 15.5, fontWeight: 800, color: C.bright, ...nowrap,
                }}>
                  <span style={{ color: C.dim, fontWeight: 700 }}>vs</span>
                  {st.fixed ? (
                    <><Flag code={st.opps[0]} w={25} /> {T[st.opps[0]].n}</>
                  ) : (
                    <>
                      {st.opps.slice(0, 2).map((c, k) => (
                        <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {k > 0 && <span style={{ color: C.dim }}>·</span>}
                          <Flag code={c} w={25} /> {T[c].n}
                        </span>
                      ))}
                      {st.opps.length > 2 && <span style={{ color: C.dim, fontWeight: 600 }}>외 {st.opps.length - 2}</span>}
                    </>
                  )}
                  {st.done && (
                    <span style={{
                      fontSize: 11.5, fontWeight: 800, flexShrink: 0,
                      color: "#5FD6C7", background: "rgba(63,191,176,0.13)",
                      border: "1px solid rgba(63,191,176,0.45)",
                      borderRadius: 6, padding: "2px 8px", letterSpacing: "0.02em",
                      ...mono,
                    }}>승 {st.score ? `${st.score[0]}-${st.score[1]}` : ""}</span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: C.dim, marginTop: 3, ...nowrap, ...mono }}>
                  {st.sched.kst} · {st.sched.city}
                </div>
                {st.goals && st.goals.length > 0 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap",
                    fontSize: 12.5, color: "#B8B8C2", marginTop: 5,
                  }}>
                    {st.goals.map((g, k) => (
                      <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <span style={{ color: C.dim, fontSize: 11 }}>⚽</span> {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
