import { useState, useEffect } from "react";

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
  // ── 32강 탈락 14개국 ─────────────────────────────────────
  de: <><rect width="150" height="33.3" fill="#000" /><rect y="33.3" width="150" height="33.4" fill="#DD0000" /><rect y="66.7" width="150" height="33.3" fill="#FFCE00" /></>,
  se: <><rect width="150" height="100" fill="#006AA7" /><rect x="44" width="16" height="100" fill="#FECC00" /><rect y="42" width="150" height="16" fill="#FECC00" /></>,
  za: <><rect width="150" height="100" fill="#fff" /><rect width="150" height="42" fill="#E23D28" /><rect y="58" width="150" height="42" fill="#001489" /><rect y="42" width="150" height="16" fill="#007A4D" /><polygon points="0,0 58,50 0,100" fill="#007A4D" /><polygon points="0,14 40,50 0,86" fill="#000" /></>,
  nl: <><rect width="150" height="33.3" fill="#AE1C28" /><rect y="33.3" width="150" height="33.4" fill="#fff" /><rect y="66.7" width="150" height="33.3" fill="#21468B" /></>,
  at: <><rect width="150" height="100" fill="#ED2939" /><rect y="33.3" width="150" height="33.4" fill="#fff" /></>,
  hr: <><rect width="150" height="33.3" fill="#FF0000" /><rect y="33.3" width="150" height="33.4" fill="#fff" /><rect y="66.7" width="150" height="33.3" fill="#171796" /><rect x="62" y="37" width="26" height="26" fill="#fff" />{[[62, 37], [75, 37], [68.5, 43.5], [81.5, 43.5], [62, 50], [75, 50], [68.5, 56.5], [81.5, 56.5]].map(([x, y], i) => <rect key={i} x={x} y={y} width="6.5" height="6.5" fill="#FF0000" />)}</>,
  sn: <><rect width="50" height="100" fill="#00853F" /><rect x="50" width="50" height="100" fill="#FDEF42" /><rect x="100" width="50" height="100" fill="#E31B23" />{star(75, 50, 15, "#00853F")}</>,
  ba: <><rect width="150" height="100" fill="#002F9E" /><polygon points="38,0 150,0 150,100" fill="#FECB00" />{[[52, 14], [68, 30], [84, 46], [100, 62], [116, 78]].map(([x, y], i) => <g key={i}>{star(x, y, 5, "#fff")}</g>)}</>,
  jp: <><rect width="150" height="100" fill="#fff" /><circle cx="75" cy="50" r="30" fill="#BC002D" /></>,
  ci: <><rect width="50" height="100" fill="#F77F00" /><rect x="50" width="50" height="100" fill="#fff" /><rect x="100" width="50" height="100" fill="#009E60" /></>,
  ec: <><rect width="150" height="100" fill="#FFDD00" /><rect y="50" width="150" height="25" fill="#034EA2" /><rect y="75" width="150" height="25" fill="#ED1C24" /><circle cx="75" cy="50" r="9" fill="#8B7A3F" /></>,
  cd: <><rect width="150" height="100" fill="#007FFF" /><line x1="0" y1="100" x2="150" y2="0" stroke="#F7D618" strokeWidth="34" /><line x1="0" y1="100" x2="150" y2="0" stroke="#CE1021" strokeWidth="18" />{star(26, 24, 12, "#F7D618")}</>,
  au: <><rect width="150" height="100" fill="#00247D" /><g><path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="7" /><path d="M0,0 L60,40 M60,0 L0,40" stroke="#CF142B" strokeWidth="3" /><rect x="25" width="10" height="40" fill="#fff" /><rect y="15" width="60" height="10" fill="#fff" /><rect x="27" width="6" height="40" fill="#CF142B" /><rect y="17" width="60" height="6" fill="#CF142B" /></g>{star(30, 70, 11, "#fff")}{[[112, 30], [132, 52], [112, 74], [96, 54], [122, 88]].map(([x, y], i) => <g key={i}>{star(x, y, 5, "#fff")}</g>)}</>,
  dz: <><rect width="75" height="100" fill="#006233" /><rect x="75" width="75" height="100" fill="#fff" /><circle cx="86" cy="50" r="18" fill="#D21034" /><circle cx="92" cy="50" r="14" fill="#fff" />{star(103, 50, 8, "#D21034")}</>,
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
  GER: { c: "de", n: "독일", r: 9 },
  SWE: { c: "se", n: "스웨덴", r: 26 },
  RSA: { c: "za", n: "남아공", r: 57 },
  NED: { c: "nl", n: "네덜란드", r: 7 },
  AUT: { c: "at", n: "오스트리아", r: 23 },
  CRO: { c: "hr", n: "크로아티아", r: 10 },
  SEN: { c: "sn", n: "세네갈", r: 18 },
  BIH: { c: "ba", n: "보스니아", r: 74 },
  JPN: { c: "jp", n: "일본", r: 15 },
  CIV: { c: "ci", n: "코트디부아르", r: 41 },
  ECU: { c: "ec", n: "에콰도르", r: 31 },
  COD: { c: "cd", n: "DR콩고", r: 56 },
  AUS: { c: "au", n: "호주", r: 24 },
  ALG: { c: "dz", n: "알제리", r: 43 },
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
// 매치 공통 형태: { win, score:[승자 득점, 상대 득점], pk:[승,상대]?, aet?,
//   goals:[[팀 코드, 득점자 문자열], ...] (승자 먼저) }.
// R16_RESULTS 는 16강 매치 인덱스(i>>1) → 결과. 경기가 끝나면 여기에 추가.
const R16_RESULTS = {
  0: { win: "FRA", score: [1, 0], goals: [["FRA", "음바페 70' (PK)"]] },
  1: { win: "MAR", score: [3, 0], goals: [["MAR", "오나히 50'·82', 라히미 90+'"]] },
  2: { win: "ESP", score: [1, 0], goals: [["ESP", "메리노 90+1'"]] },
  3: { win: "BEL", score: [4, 1], goals: [["BEL", "더케텔라러 9'·33', 바나컨 57', 루카쿠 90+3'"], ["USA", "틸먼 31'"]] },
  4: { win: "NOR", score: [2, 1], goals: [["NOR", "홀란 80'·86'"], ["BRA", "네이마르 90' (PK)"]] },
  5: { win: "ENG", score: [3, 2], goals: [["ENG", "벨링엄 36'·38', 케인 60' (PK)"], ["MEX", "키뇨네스 42', 히메네스 69' (PK)"]] },
};

// 32강 결과(전 경기 종료). R32[k] = 16강 슬롯 k 로 진출한 매치. win = SLOTS[k] 승자.
const R32 = [
  { win: "PAR", opp: "GER", score: [1, 1], pk: [4, 3], sched: { kst: "6/30 (화) 05:30", city: "보스턴" }, goals: [["PAR", "엔시소 42'"], ["GER", "하베르츠 54'"]] },
  { win: "FRA", opp: "SWE", score: [3, 0], sched: { kst: "7/1 (수) 06:00", city: "뉴저지" }, goals: [["FRA", "음바페 45'·74', 바르콜라 53'"]] },
  { win: "CAN", opp: "RSA", score: [1, 0], sched: { kst: "6/29 (월) 04:00", city: "LA" }, goals: [["CAN", "에우스타키우 90+2'"]] },
  { win: "MAR", opp: "NED", score: [1, 1], pk: [3, 2], sched: { kst: "6/30 (화) 10:00", city: "몬테레이" }, goals: [["MAR", "디오프 90+1'"], ["NED", "하크포 72'"]] },
  { win: "ESP", opp: "AUT", score: [3, 0], sched: { kst: "7/3 (금) 04:00", city: "LA" }, goals: [["ESP", "오야르사발 36'·89', 포로 66'"]] },
  { win: "POR", opp: "CRO", score: [2, 1], sched: { kst: "7/3 (금) 08:00", city: "토론토" }, goals: [["POR", "호날두 68' (PK), 하무스 90+4'"], ["CRO", "페리시치 53'"]] },
  { win: "BEL", opp: "SEN", score: [3, 2], aet: true, sched: { kst: "7/2 (목) 05:00", city: "시애틀" }, goals: [["BEL", "루카쿠 86', 티엘레만스 89'·120+ (PK)"], ["SEN", "디아라 25', 사르 51'"]] },
  { win: "USA", opp: "BIH", score: [2, 0], sched: { kst: "7/2 (목) 09:00", city: "샌프란시스코" }, goals: [["USA", "발로건 45', 틸먼 82'"]] },
  { win: "BRA", opp: "JPN", score: [2, 1], sched: { kst: "6/30 (화) 02:00", city: "휴스턴" }, goals: [["BRA", "카세미루 56', 마르티넬리 90+5'"], ["JPN", "사노 29'"]] },
  { win: "NOR", opp: "CIV", score: [2, 1], sched: { kst: "7/1 (수) 02:00", city: "댈러스" }, goals: [["NOR", "누사 39', 홀란 86'"], ["CIV", "디알로 74'"]] },
  { win: "MEX", opp: "ECU", score: [2, 0], sched: { kst: "7/1 (수) 12:00", city: "멕시코시티" }, goals: [["MEX", "키뇨네스 22', 히메네스 31'"]] },
  { win: "ENG", opp: "COD", score: [2, 1], sched: { kst: "7/2 (목) 01:00", city: "애틀랜타" }, goals: [["ENG", "케인 75'·86'"], ["COD", "시펜가 7'"]] },
  { win: "EGY", opp: "AUS", score: [1, 1], pk: [4, 2], sched: { kst: "7/4 (토) 03:00", city: "댈러스" }, goals: [["EGY", "아쇼르 13'"], ["AUS", "M.하니 55' (자책)"]] },
  { win: "ARG", opp: "CPV", score: [3, 2], aet: true, sched: { kst: "7/4 (토) 07:00", city: "마이애미" }, goals: [["ARG", "메시 29', L.마르티네스 92', 보르지스 자책 111'"], ["CPV", "두아르트 59', 로페스카브랄 103'"]] },
  { win: "SUI", opp: "ALG", score: [2, 0], sched: { kst: "7/3 (금) 12:00", city: "밴쿠버" }, goals: [["SUI", "엠볼로 10', 은도예 46'"]] },
  { win: "COL", opp: "GHA", score: [1, 0], sched: { kst: "7/4 (토) 10:30", city: "캔자스시티" }, goals: [["COL", "아리아스 14'"]] },
];

// 웹(32강) 바깥 링 32칸: 짝수=승자, 홀수=패자. SLOTS[k] 는 R32[k].win 과 일치.
const SLOTS32 = R32.flatMap((m) => [[m.win], [m.opp]]);

// 진 팀(탈락) 코드 집합 — 32강 패자 + 16강 패자.
const ELIMINATED = new Set([
  ...R32.map((m) => m.opp),
  ...Object.entries(R16_RESULTS).map(([m, r]) => {
    const a = SLOTS[m * 2][0], b = SLOTS[m * 2 + 1][0];
    return r.win === a ? b : a;
  }),
]);

const C = {
  bg: "#0A0A0C", card: "#141419", faint: "#1F1F26",
  line: "#3A3A46", dim: "#5C5C66", bright: "#F5F5F7", gold: "#F2C14E",
  loss: "#E5787C",
};

// ── 예상 상대(16강 이후) ─────────────────────────────────────
// i = 16강 슬롯 인덱스(0..15). 32강은 이 함수를 거치지 않고 가산 레이어로 앞에 붙는다.
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
  return [
    { round: "16강", opps: opp16, fixed: opp16.length === 1, sched: R16_SCHED[i >> 1] },
    { round: "8강", opps: oppQF, fixed: !!sibWin, sched: QF_SCHED[i >> 2] },
    { round: "4강", opps: oppSF, fixed: false, sched: SF_SCHED[i >> 3] },
    { round: "결승", opps: oppF, fixed: false, sched: FIN_SCHED },
  ];
}

// 완료 매치(승자 시점 저장)를 선택 팀 시점으로 뒤집어 스텝에 결과 필드를 채운다.
function applyResult(step, match, team) {
  const won = match.win === team;
  step.done = true;
  step.won = won;
  step.myScore = won ? match.score : [match.score[1], match.score[0]];
  step.pk = match.pk ? (won ? match.pk : [match.pk[1], match.pk[0]]) : null;
  step.aet = !!match.aet;
  step.goals = match.goals;
  step.eliminated = !won;
  return step;
}

// 16강 슬롯 k(팀 team)의 16강→결승 스텝. 진 라운드에서 잘라낸다.
function steps16(k, team) {
  const base = pathOpponents(k);
  const r16 = R16_RESULTS[k >> 1];
  if (r16) {
    applyResult(base[0], r16, team);
    if (base[0].eliminated) return { steps: [base[0]], eliminatedRound: "16강" };
  }
  return { steps: base, eliminatedRound: null };
}

// 바깥 링 노드 인덱스 → 우승까지의 여정.
//   levels 5(web): entry 0..31(32강) / levels 4(mobile): entry 0..15(16강).
function buildJourney(entryIndex, levels) {
  if (levels === 5) {
    const m = entryIndex >> 1;
    const r32 = R32[m];
    const team = entryIndex % 2 === 0 ? r32.win : r32.opp;
    const oppCode = team === r32.win ? r32.opp : r32.win;
    const step32 = applyResult(
      { round: "32강", opps: [oppCode], fixed: true, sched: r32.sched }, r32, team
    );
    if (step32.eliminated) return { team, steps: [step32], eliminatedRound: "32강" };
    const rest = steps16(m, team);
    return { team, steps: [step32, ...rest.steps], eliminatedRound: rest.eliminatedRound };
  }
  const team = SLOTS[entryIndex][0];
  const rest = steps16(entryIndex, team);
  return { team, steps: rest.steps, eliminatedRound: rest.eliminatedRound };
}

// ═══ 좌표 ════════════════════════════════════════════════════
const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
};
const arcLink = (cx, cy, cDeg, cR, pDeg, pR) => {
  const [x1, y1] = polar(cx, cy, cR, cDeg);
  const [x2, y2] = polar(cx, cy, pR, cDeg);
  const [x3, y3] = polar(cx, cy, pR, pDeg);
  const sweep = ((pDeg - cDeg + 540) % 360) > 180 ? 0 : 1;
  return `M ${x1} ${y1} L ${x2} ${y2} A ${pR} ${pR} 0 0 ${sweep} ${x3} ${y3}`;
};

// 링 기하를 레벨 수에서 생성. ring r: 노드 2^(levels-r)개, 반지름 radii[r].
// 각도는 ((i+0.5)/count)*360 — 대칭 브래킷에선 자식 중점과 동일하다.
function makeRings(radii, levels) {
  return radii.map((radius, r) => {
    const count = 2 ** (levels - r);
    const angles = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 360);
    return { r, count, radius, angles };
  });
}

// 모드별 기하. mobile(4링·16강 바깥)은 기존 값 그대로, web(5링·32강 바깥)은 확대.
const MODES = {
  mobile: {
    levels: 4, cx: 500, cy: 505, viewBox: "0 44 1000 924", maxWidth: 680,
    radii: [398, 264, 176, 102], entryFw: 80, entryOffset: 54, juncFw: 46,
    softR: 300, champR: 76, trophy: 60, stripMax: 560, headScale: 1,
    rings: makeRings([398, 264, 176, 102], 4),
  },
  web: {
    // 원을 800으로 줄이고(밸런스+세로 스크롤 완화) 헤더는 1.45배 키움
    levels: 5, cx: 600, cy: 600, viewBox: "0 0 1200 1200", maxWidth: 800,
    radii: [548, 392, 270, 178, 102], entryFw: 64, entryOffset: 38, juncFw: 46,
    softR: 380, champR: 92, trophy: 74, stripMax: 640, headScale: 1.45,
    rings: makeRings([548, 392, 270, 178, 102], 5),
  },
};

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

// ═══ 브래킷 팀 노드 (직사각형 국기) ══════════════════════════
function TeamNode({ x, y, slot, fw = 80, active, isOpp, faded, eliminated, onClick }) {
  const fh = Math.round((fw * 2) / 3);
  return (
    <g className="node" onClick={onClick} style={{
      cursor: "pointer",
      opacity: eliminated ? 0.4 : faded ? 0.18 : 1,
      transform: active ? "scale(1.18)" : isOpp ? "scale(1.08)" : "scale(1)",
    }}>
      {(active || isOpp) && <circle cx={x} cy={y} r={fw * 0.72} fill="url(#glowGold)" />}
      <circle cx={x} cy={y} r={fw * 0.68} fill="transparent" />
      <g style={{ filter: "drop-shadow(0 4px 9px rgba(0,0,0,0.55))" }}>
        <svg x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} viewBox="0 0 150 100">
          <use href={`#flag-${T[slot[0]].c}`} />
        </svg>
        <rect x={x - fw / 2} y={y - fh / 2} width={fw} height={fh} rx={5}
          fill="none" stroke={active || isOpp ? C.gold : "rgba(255,255,255,0.14)"}
          strokeWidth={active ? 2.5 : 1} />
      </g>
      {eliminated && (
        <line x1={x - fw / 2} y1={y + fh / 2} x2={x + fw / 2} y2={y - fh / 2}
          stroke="#E5484D" strokeWidth={fw > 64 ? 3 : 2.2} strokeLinecap="round" />
      )}
    </g>
  );
}

// ═══ 메인 ════════════════════════════════════════════════════
// 760px 기준으로 web(5링·32강)/mobile(4링·16강) 전환. 리사이즈 실시간 반영.
const modeFor = () => (typeof window !== "undefined" && window.innerWidth >= 760 ? "web" : "mobile");
function useMode() {
  const [mode, setMode] = useState(modeFor);
  useEffect(() => {
    const onResize = () => setMode((prev) => { const m = modeFor(); return m === prev ? prev : m; });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return mode;
}

export default function PathBracketV7() {
  const [sel, setSel] = useState(null);
  const modeKey = useMode();
  const M = MODES[modeKey];
  const { levels, cx, cy, rings, radii, entryFw, entryOffset, juncFw } = M;

  // 모드 전환 시 인덱스 범위(16↔32)가 달라지므로 선택 해제
  useEffect(() => { setSel(null); }, [modeKey]);

  const entryTeams = levels === 5 ? SLOTS32 : SLOTS;
  // 전환 직후 프레임엔 sel 이 이전 범위일 수 있어 범위 밖이면 무시
  const journey = sel !== null && sel < entryTeams.length ? buildJourney(sel, levels) : null;
  const selTeam = journey ? journey.team : null;
  const steps = journey ? journey.steps : null;
  const eliminated = journey ? !!journey.eliminatedRound : false;
  const wonCount = journey ? steps.filter((s) => s.won).length : 0;
  const remaining = journey && !eliminated ? steps.length - wonCount : 0;
  const reachRing = journey ? (eliminated ? wonCount : levels - 1) : -1;

  // 링 r 슬롯 i 에 표시할 진출 승자 코드(없으면 null)
  const ringWinner = (r, i) => {
    if (levels === 5) {
      if (r === 1) return R32[i].win;
      if (r === 2) return R16_RESULTS[i]?.win || null;
      return null;
    }
    if (r === 1) return R16_RESULTS[i]?.win || null;
    return null;
  };

  const onPath = (r, i) => sel !== null && i === (sel >> r) && r <= reachRing;

  // 팀 코드 → 바깥 진입 슬롯 인덱스(고유). 안쪽 승자 국기 클릭 시 그 팀을 선택.
  const entryIndexOf = (code) => entryTeams.findIndex((sl) => sl[0] === code);

  // 링 r 의 자식 노드(childIdx) → 부모 링(r+1, childIdx>>1)까지의 경로 d.
  // 마지막 링은 중심으로. 배경 브래킷과 선택 경로가 같은 규칙을 공유한다.
  const ringPath = (r, childIdx) => {
    const cR = r === 0 ? radii[0] - entryOffset : radii[r];
    const cDeg = rings[r].angles[childIdx];
    if (r < levels - 1) {
      return arcLink(cx, cy, cDeg, cR, rings[r + 1].angles[childIdx >> 1], radii[r + 1]);
    }
    const [px, py] = polar(cx, cy, cR, cDeg);
    return `M ${px} ${py} L ${cx} ${cy}`;
  };

  // 선택 팀의 금색 경로(탈락 팀은 이긴 라운드까지만)
  const segs = [];
  if (journey) {
    const nSeg = eliminated ? wonCount : levels;
    for (let r = 0; r < nSeg; r++) {
      segs.push({ d: ringPath(r, sel >> r), fixed: steps[r] ? !!steps[r].fixed : false });
    }
  }

  const badgeStyle = (won) => ({
    fontSize: 11.5, fontWeight: 800, flexShrink: 0,
    color: won ? "#5FD6C7" : C.loss,
    background: won ? "rgba(63,191,176,0.13)" : "rgba(229,120,124,0.13)",
    border: `1px solid ${won ? "rgba(63,191,176,0.45)" : "rgba(229,120,124,0.5)"}`,
    borderRadius: 6, padding: "2px 8px", letterSpacing: "0.02em", ...mono,
  });
  const resultText = (st) =>
    `${st.won ? "승" : "패"} ${st.myScore[0]}-${st.myScore[1]}` +
    (st.pk ? ` (PK ${st.pk[0]}-${st.pk[1]})` : st.aet ? " (연장)" : "");

  const hs = M.headScale; // 헤더 글자·간격 배수 (web 1.45 / mobile 1)

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
        fontSize: 11 * hs, letterSpacing: "0.35em", color: C.dim,
        ...mono, marginBottom: 14 * hs,
      }}>FIFA WORLD CUP 26 · KNOCKOUT</div>

      {/* 헤더 */}
      <div style={{
        minHeight: 48 * hs, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 7 * hs,
        marginBottom: 4,
      }}>
        {!journey ? (
          <>
            <span style={{ fontSize: 18 * hs, fontWeight: 800, color: C.bright, letterSpacing: "-0.01em" }}>
              다음 상대가 궁금한 팀을 눌러보세요
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 16 * hs, fontSize: 12.5 * hs, color: C.dim }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width={26 * hs} height="4"><line x1="0" y1="2" x2={26 * hs} y2="2" stroke={C.gold} strokeWidth="3.5" strokeLinecap="round" /></svg>
              확정
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
              <svg width={26 * hs} height="4"><line x1="1" y1="2" x2={26 * hs} y2="2" stroke={C.gold} strokeWidth="3" strokeLinecap="round" strokeDasharray="1.5 6" /></svg>
              예상
            </span>
          </span>
          </>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 * hs }}>
            <Flag code={selTeam} w={Math.round(27 * hs)} />
            <span style={{ fontSize: 18 * hs, fontWeight: 800, letterSpacing: "-0.01em" }}>
              {T[selTeam].n} <span style={{ color: C.dim, fontWeight: 600 }}>·</span>{" "}
              {eliminated
                ? <span style={{ color: C.loss }}>{journey.eliminatedRound} 탈락</span>
                : <>우승까지 <span style={{ color: C.gold }}>{remaining}경기</span></>}
            </span>
          </span>
        )}
      </div>

      <svg viewBox={M.viewBox} style={{
          width: "100%", maxWidth: M.maxWidth,
          userSelect: "none", WebkitUserSelect: "none",
        }}
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

        <circle cx={cx} cy={cy} r={M.softR} fill="url(#glowSoft)" />

        {/* 배경 브래킷 라인 */}
        {rings.map((ring) => ring.angles.map((_, i) => (
          <path key={`b${ring.r}-${i}`} d={ringPath(ring.r, i)}
            fill="none" stroke={C.line}
            strokeWidth={ring.r === 0 ? 1.8 : 1.3} opacity={ring.r === 0 ? 1 : 0.75} />
        )))}

        {/* 선택 경로 */}
        {segs.map((s, i) => (
          <path key={`s${i}`} d={s.d} fill="none" stroke={C.gold}
            className={s.fixed ? "" : "flow"}
            strokeWidth={s.fixed ? 4.5 : 3}
            strokeLinecap="round"
            strokeDasharray={s.fixed ? "none" : "2 13"}
            style={{ filter: `drop-shadow(0 0 5px ${C.gold}55)` }} />
        ))}

        {/* 정션 노드(r>=1): 진출 승자 국기 or 점 */}
        {rings.slice(1).map((ring) => ring.angles.map((deg, i) => {
          const [x, y] = polar(cx, cy, ring.radius, deg);
          const hot = onPath(ring.r, i);
          const winner = ringWinner(ring.r, i);
          if (winner) {
            const fw = juncFw, fh = Math.round((fw * 2) / 3);
            const eIdx = entryIndexOf(winner);
            return (
              <g key={`j${ring.r}-${i}`} className="node"
                onClick={(e) => { e.stopPropagation(); setSel(sel === eIdx ? null : eIdx); }}
                style={{
                  cursor: "pointer",
                  opacity: sel === null ? 1 : hot ? 1 : 0.4,
                  transform: hot ? "scale(1.15)" : "scale(1)",
                }}>
                {hot && <circle cx={x} cy={y} r={fw * 0.72} fill="url(#glowGold)" />}
                <circle cx={x} cy={y} r={fw * 0.68} fill="transparent" />
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
            <circle key={`j${ring.r}-${i}`} cx={x} cy={y}
              r={hot ? 6 : ring.r === 1 ? 5.5 : 4.5}
              fill={hot ? C.gold : C.line}
              opacity={sel === null ? 0.95 : hot ? 1 : 0.3}
              style={{ transition: "opacity .35s ease" }} />
          );
        }))}

        {/* 바깥 팀 노드 */}
        {entryTeams.map((slot, i) => {
          const [x, y] = polar(cx, cy, radii[0], rings[0].angles[i]);
          return (
            <TeamNode key={`t${i}`} x={x} y={y} slot={slot} fw={entryFw}
              active={sel === i}
              isOpp={sel !== null && i === (sel ^ 1)}
              faded={sel !== null && sel !== i && i !== (sel ^ 1)}
              eliminated={ELIMINATED.has(slot[0])}
              onClick={() => setSel(sel === i ? null : i)} />
          );
        })}

        <circle cx={cx} cy={cy} r={M.champR} fill="url(#glowGold)"
          opacity={journey && !eliminated ? 1 : 0.55}
          style={{ transition: "opacity .35s ease" }} />
        <text x={cx} y={cy + 4} textAnchor="middle" dominantBaseline="middle" fontSize={M.trophy}
          style={{
            filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.6))",
            userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none",
          }}>🏆</text>
      </svg>

      {/* 여정 스트립 + 일정 카드 */}
      {journey && (
        <div style={{
          marginTop: 12, width: "calc(100% - 28px)", maxWidth: M.stripMax,
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
                  <line x1="1" y1="2" x2="51" y2="2" stroke={st.won === false ? C.loss : C.gold}
                    strokeWidth={st.fixed ? 3 : 2}
                    strokeLinecap="round"
                    strokeDasharray={st.fixed ? "none" : "1.5 6"}
                    opacity={st.fixed ? 1 : 0.75} />
                </svg>
                {i < steps.length - 1 && (
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
              border: st.done
                ? `1px solid ${st.won ? "rgba(63,191,176,0.35)" : "rgba(229,120,124,0.4)"}`
                : st.fixed ? `1px solid ${C.gold}55` : `1px dashed ${C.faint}`,
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
                  {st.done && <span style={badgeStyle(st.won)}>{resultText(st)}</span>}
                </div>
                <div style={{ fontSize: 13, color: C.dim, marginTop: 3, ...nowrap, ...mono }}>
                  {st.sched.kst} · {st.sched.city}
                </div>
                {st.goals && st.goals.length > 0 && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                    fontSize: 12.5, marginTop: 5,
                  }}>
                    {st.goals.map(([team, txt], k) => (
                      <span key={k} style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        color: team === selTeam ? "#B8B8C2" : C.dim,
                      }}>
                        <Flag code={team} w={17} /> {txt}
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
