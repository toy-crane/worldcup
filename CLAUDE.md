# CLAUDE.md

2026 북중미 월드컵 결선 토너먼트 대진표. 구조·빌드·데이터 필드 설명은 [README.md](README.md) 참고.

## 경기 결과 데이터 출처

경기 결과(스코어·득점자·일정·개최지)를 갱신할 때는 아래에서 **찾아서 교차검증**한다.
학습 지식으로 채우지 말 것 — 대회는 학습 컷오프 이후라 반드시 웹에서 확인한다.

**1순위 (최신·상세, 여기부터):**
- 넉아웃 전체: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_knockout_stage
- 라운드별(득점자·분·개최지까지): `https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_round_of_32` · `.../round_of_16` · `.../2026_FIFA_World_Cup_knockout_stage` 내 8강·4강·결승 섹션
  - 위키 넉아웃 문서는 길어서 WebFetch가 뒤 경기를 잘라먹는다 → 라운드/경기별로 좁혀서 요청.

**교차검증용 (최소 2개 소스 일치 확인):**
- ESPN: https://www.espn.com/soccer/ (fixtures/results, 매치 리포트에 라인업·득점자)
- CBS Sports 브래킷: https://www.cbssports.com/soccer/news/2026-fifa-world-cup-bracket-round-of-32-results-round-of-16-matchups-final/
- FIFA 공식 매치센터: https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026
- Sky Sports · Al Jazeera 매치 리포트 (득점자·자책골·승부차기 상세)

## 갱신 규칙

- **정합성**: 다음 라운드 승자 = 현재 라운드 슬롯. 새 결과의 승자 집합이 기존 다음-라운드 라인업과 정확히 일치해야 함.
- **스코어는 승자 시점**으로 저장(`score: [승자, 상대]`). 승부차기는 `pk: [승자, 상대]`, 연장 승리는 `aet: true`. 자책골은 득점자 문자열에 `(자책)`.
- **일정은 KST**로 변환. 개최지 현지시각 + (동부 UTC−4 → +13h / 중부 −5 → +14h / 산악 −6·−7 → +15·+16h). 요일은 한글(일·월·화…). 앵커: 2026-07-05 = 일요일.
- 확인 못 하거나 소스가 충돌하는 경기는 **지어내지 말고** 그대로 보고.
