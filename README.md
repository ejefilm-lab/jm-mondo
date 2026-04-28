# JM Mondo — 인테리어 디자인 스튜디오 사이트

JM Mondo (제이엠몬도) 인테리어 디자인 스튜디오를 위한 **정적 HTML 사이트**입니다.
편집디자인 스타일의 미니멀 미감으로 구성되어 있으며, GitHub Pages 에 그대로 배포 가능합니다.
동적 기능(문의/예약)은 외부 서비스와 연동하는 구조입니다.

---

## 📁 파일 구조

```
jm-mondo/
├── index.html          ← HOME
├── about.html          ← ABOUT (Company / CEO Message / Promise)
├── business.html       ← BUSINESS (Space / Exterior / Brand Design)
├── project.html        ← PROJECT (필터 갤러리)
├── review.html         ← REVIEW
├── contact.html        ← CONTACT (Formspree)
├── reservation.html    ← RESERVATION (Calendly)
├── notice.html         ← NOTICE
├── css/
│   └── style.css       ← 전체 스타일
├── js/
│   └── main.js         ← 공통 인터랙션
├── images/             ← 포트폴리오 이미지 폴더 (비어있음)
└── README.md
```

---

## 🚀 GitHub Pages 배포 (5분)

1. **GitHub 레포지토리 생성**
   ```bash
   cd jm-mondo
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO>.git
   git push -u origin main
   ```

2. **GitHub Pages 활성화**
   - Repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / Folder: `/ (root)` → Save
   - 1~2분 후 `https://<USERNAME>.github.io/<REPO>/` 로 접속

3. **커스텀 도메인 (선택)**
   - Settings → Pages → Custom domain 에 도메인 입력
   - 도메인 DNS 에 CNAME 또는 A 레코드 추가
   - Enforce HTTPS 체크

---

## 📨 Formspree 연동 (CONTACT 폼)

1. [formspree.io](https://formspree.io) 가입 (무료 50건/월)
2. New Form → 받을 이메일 입력 → Form ID 받기 (예: `xyzqwerty`)
3. `contact.html`, `reservation.html` 안의 form 태그를 수정:

   **수정 전:**
   ```html
   <form
     class="form-wrap"
     data-form
     data-fake="true"
     method="POST"
     action="https://formspree.io/f/YOUR_FORM_ID"
   >
   ```

   **수정 후:**
   ```html
   <form
     class="form-wrap"
     data-form
     method="POST"
     action="https://formspree.io/f/xyzqwerty"
   >
   ```

   👉 `data-fake="true"` 속성 **삭제**, `YOUR_FORM_ID` 부분에 받은 ID 입력

4. 제출 시 등록한 메일로 문의 내용 도착

> **대안**: [FormSubmit](https://formsubmit.co) (가입 없이 사용 가능), [Netlify Forms](https://www.netlify.com/products/forms/) (Netlify 호스팅 시)

---

## 📅 Calendly 연동 (예약 페이지)

1. [calendly.com](https://calendly.com) 가입 (무료 플랜 가능)
2. 새 이벤트 타입 생성 (예: "Studio Visit, 60min")
3. Share → **Embed → Inline Embed** → 코드 복사
4. `reservation.html` 의 `#calendly-embed` 영역 안의 placeholder 를 복사한 코드로 교체:

   ```html
   <div class="embed-frame" id="calendly-embed">
     <!-- 여기에 Calendly inline 코드 붙여넣기 -->
     <div class="calendly-inline-widget"
          data-url="https://calendly.com/your-account/studio-visit"
          style="min-width:320px;height:700px;"></div>
     <script type="text/javascript"
             src="https://assets.calendly.com/assets/external/widget.js" async></script>
   </div>
   ```

> **국내 대안**: 네이버 예약 위젯, 구글 캘린더 약속 시간(Appointment Schedule)

---

## 🎨 커스터마이징 가이드

### 컬러 변경

`css/style.css` 상단의 `:root` 변수만 수정하면 전체 사이트에 반영:

```css
:root {
  --bg: #faf7f2;        /* 배경 (warm cream) */
  --bg-alt: #f3eee5;    /* 섹션 대조 배경 */
  --text: #1a1a1a;      /* 본문 */
  --text-muted: #6b6b6b;
  --line: #d8d2c5;
  /* … */
}
```

### 폰트 변경

기본은 `Cormorant Garamond` (영문 이탤릭) + `Noto Sans KR` (국문).
Google Fonts 다른 조합으로 바꾸려면 각 HTML의 `<link href="https://fonts.googleapis.com/css2?...">` 부분과 CSS 의 `--font-display`, `--font-body` 변수 수정.

추천 대안:
- 영문 디스플레이: `EB Garamond`, `Italiana`, `Cormorant Infant`, `Playfair Display`
- 국문: `Pretendard`, `Noto Serif KR`, `Nanum Myeongjo`

### 포트폴리오 이미지 추가

1. `images/` 폴더에 jpg/webp 이미지 추가 (권장: 1200×1500, WebP, 200KB 이하)
2. `project.html` 의 `.project-item` 안의 placeholder 를 실제 이미지로 교체:

   ```html
   <!-- 변경 전 -->
   <div class="img-wrap"><div class="placeholder"><em>Wellness Clinic</em></div></div>

   <!-- 변경 후 -->
   <div class="img-wrap"><img src="images/wellness-clinic.webp" alt="Wellness Clinic" loading="lazy" /></div>
   ```

### 카카오톡 / 전화번호 / 이메일 변경

전체 페이지에 동일 코드가 들어있으니 **전체 검색·치환** 추천:
- `02 . 0000 . 0000` → 실제 번호
- `0212345678` → 전화번호 (tel: 링크용, 하이픈 없이)
- `hello@example.com` → 실제 이메일
- `http://pf.kakao.com/` → 실제 카카오 채널 링크

### SNS 링크 변경

footer 와 mobile drawer 에 있는 `<a href="#">` 부분의 `#` 을 실제 SNS URL 로 교체.

---

## 🔧 로컬 개발

별도 빌드 도구 없이 **브라우저에서 바로 열어서** 작업할 수 있어요.
다만 서브 페이지 라우팅 테스트엔 간단 서버를 띄우는 게 편합니다:

```bash
# Python 3
python3 -m http.server 8000

# Node (live-server 설치 시)
npx live-server
```

→ `http://localhost:8000` 접속

---

## 📝 동적 기능 처리 방식

이 사이트는 **정적 + 외부 서비스** 구조입니다. 일반적인 빌더(아임웹/Cafe24) 사이트의 동적 기능을 다음과 같이 대체합니다:

| 일반 빌더의 기능 | 이 사이트의 대체 방식 |
|---|---|
| 회원가입 / 마이페이지 / 알림 | ❌ 제거 (방문 사용자 입장에선 거의 사용 안 함) |
| 게시판 (REVIEW, NOTICE) | 정적 HTML 리스트 (수동 업데이트) |
| 문의 폼 | Formspree |
| 예약 시스템 | Calendly |
| 이미지 호스팅 | GitHub repo의 `images/` 폴더 |

**장점**: 호스팅 무료, 빠른 로딩, 코드 완전 소유
**단점**: NOTICE 등 잦은 업데이트는 코드 수정·푸시 필요 → 잦으면 Notion API 연동 또는 헤드리스 CMS(Sanity, Contentful) 권장

---

## 💡 다음 단계 아이디어

- [ ] 실제 포트폴리오 이미지 배치 + 프로젝트 상세 페이지 생성
- [ ] 영문 페이지 분리 (`/en/` 디렉토리 또는 i18n)
- [ ] 다크 모드 (`prefers-color-scheme`)
- [ ] 프로젝트 라이트박스 (Fancybox / GLightbox)
- [ ] Plausible / GA4 분석 코드 삽입
- [ ] OG 이미지 + 소셜 메타태그 (`<meta property="og:*">`) 추가
- [ ] sitemap.xml, robots.txt 생성

---

Made with care.
