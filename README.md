# 북중미 월드컵 결선 토너먼트 브래킷

팀을 탭하면 결승까지의 여정(확정 대진 실선 / 예상 경로 점선)과
라운드별 실제 경기 일정(KST)이 표시되는 원형 대진표.

배포: https://worldcup-toycranes-projects.vercel.app

## 구조

- `src/App.jsx` — 브래킷 전체 (대진 데이터 + 인라인 SVG 국기 + UI)
- `src/main.jsx` — React 엔트리
- `index.html` — HTML 셸 (SEO 메타태그, 파비콘, 크레딧 링크 포함)
- `app.js` — 빌드 결과물 (커밋에 포함, Vercel이 정적 서빙)
- `og.png` / `favicon.svg` / `apple-touch-icon.png` — 공유·아이콘 에셋

## 실행

```bash
npm install
npm run dev      # esbuild watch 빌드
npm run build    # app.js 생성
vercel --prod    # 프로덕션 배포
```

빌드는 `--jsx=automatic`을 사용한다. classic 변환으로 빌드하면
App.jsx에 React import가 없어 전역 React 참조 에러가 나므로 바꾸지 말 것.

## 데이터 갱신

`src/App.jsx` 상단의 `SLOTS`(16강 슬롯), `R16_SCHED`/`QF_SCHED`/`SF_SCHED`(일정)만 수정하면 됨.
국기는 `FLAG_ART`에 인라인 SVG로 포함 (외부 요청 없음).

경기 결과는 `R16_RESULTS`(매치 인덱스 → 승자 코드)에 추가한다. 승자는
안쪽 8강 자리로 진출(국기 표시)하고, 진 팀은 대진표에서 탈락(흐림 + 사선) 처리되며,
승자가 정해진 8강 대진은 예상(점선)에서 확정(실선)으로 바뀐다.
