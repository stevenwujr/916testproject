# DIC 1: Personal Portal & Live Precision Dashboard

> **Course Assignment**: DIC 1 (Do In Class 1)  
> **Student / Author**: 巫佳祐 (Steven Wu)  
> **Repository**: [stevenwujr/916testproject](https://github.com/stevenwujr/916testproject)  
> **Live Demo**: [https://stevenwujr.github.io/916testproject/](https://stevenwujr.github.io/916testproject/)

---

## 🌐 Live Demo & Preview

🔗 **Experience the Live Web Application:**  
**👉 [https://stevenwujr.github.io/916testproject/](https://stevenwujr.github.io/916testproject/)**

![Personal Page Snapshot](./snapshot.png)

---

## 📌 Project Overview

This project was developed during **DIC 1 (Do In Class 1)** as a comprehensive hands-on practice in modern front-end web engineering, AI-assisted pair programming, and automated Git/GitHub Pages deployment.

The application is an ethereal, cyber-glassmorphism personal portal featuring:
- A prominent, customizable profile card with instant inline editing.
- A high-precision live digital clock with 12H / 24H switching.
- Dynamic time-of-day greetings synchronized with the client's local timezone.
- An animated 24-hour day progress bar.
- Interactive widgets (daily inspiration quotes and active learning focuses).
- Multiple neon accent themes with client-side persistence via `localStorage`.

---

## 🔄 Project Workflow

The development lifecycle for this project followed a structured modern engineering pipeline:

```mermaid
flowchart TD
    A([🚀 Phase 1: Requirements & Goal Definition]) --> B([📋 Phase 2: Implementation Plan & Spec])
    B --> C([🎨 Phase 3: UI Design System & Styling])
    C --> D([⚙️ Phase 4: Core Logic & DOM Architecture])
    D --> E([🧪 Phase 5: Local Testing & Validation])
    E --> F([🚢 Phase 6: Git Version Control & Push])
    F --> G([🌐 Phase 7: GitHub Pages Live Deployment])
    G --> H([📝 Phase 8: Documentation & Snapshot])

    subgraph Details
    C -.-> C1[Glassmorphism CSS Tokens + Google Fonts]
    D -.-> D1[Live Clock Loop + Dynamic Greeting + LocalStorage]
    E -.-> E1[HTTP 200 Verification + Node Syntax Check]
    F -.-> F1[Commit & Push to GitHub Main Branch]
    end
```

### Detailed Workflow Steps

1. **Requirement Analysis & AI Alignment**:
   - Specified core deliverables: personal name display, real-time clock, responsive layout, and modern aesthetics.
   - Formulated an implementation plan with clear architectural boundaries.

2. **Design System & Visual Styling (`style.css`)**:
   - Established CSS custom properties (`:root`) for dynamic accent switching (`indigo`, `cyan`, `rose`, `emerald`).
   - Implemented frosted glassmorphism using `backdrop-filter: blur(20px)` and floating ambient light orbs.
   - Loaded modern typography: [Outfit](https://fonts.google.com/specimen/Outfit) for headings and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for tabular clock numerals.

3. **Component & Logic Construction (`index.html` & `script.js`)**:
   - Structured semantic HTML5 tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<dialog>`).
   - Built a 1000ms real-time clock loop calculating hours, minutes, seconds, and elapsed day percentage.
   - Integrated dynamic daytime greetings (`Morning Momentum`, `High Productivity`, `Golden Twilight`, `Midnight Focus`).
   - Added modal profile editing with real-time DOM reflection and `localStorage` persistence.

4. **Testing & Verification**:
   - Validated static assets (`index.html`, `style.css`, `script.js`, `avatar.jpg`) via local Python HTTP server (`200 OK`).
   - Executed static JavaScript syntax analysis (`node -c script.js`).

5. **Deployment & Release**:
   - Initialized Git repository, committed codebase, and pushed upstream to GitHub.
   - Activated GitHub Pages for global public access.
   - Documented the repository and embedded live snapshots.

---

## ✨ 核心規格與五大必備項目 (Core Requirements Checklist)

| 必備項目 | 實作內容與規格說明 | 達成狀態 |
| :--- | :--- | :---: |
| 👤 **1. Profile (個人資訊)** | 完整呈現 **姓名**（巫佳祐）、**Avatar 個人頭貼**、**科系**（資訊工程學系 CSIE）、**專長**（AI • IoT • Web）、以及**簡短自我介紹**，並提供即時自訂彈窗。 | ✅ 已達成 |
| 🛠 **2. Skills (專業技能)** | 列出 6 項核心技術（遠超規定之 3 項）：**Python**、**C / C++**、**AI & Machine Learning**、**Web Development**、**IoT & Embedded**、**Data Analysis**，皆附專業領域標籤。 | ✅ 已達成 |
| 🚀 **3. Projects (專案作品)** | 包含已完成作品 **Personal Portal & Live Clock**（含技術標籤、[Live Demo](https://stevenwujr.github.io/916testproject/) 與 GitHub Link），以及本學期預計完成作品 **AI Edge IoT Vision System**。 | ✅ 已達成 |
| 🕐 **4. Live Clock (即時時鐘)** | 使用原生 JavaScript 打造毫秒級自動更新時鐘，精確顯示 **HH : MM : SS**，並支援 12H/24H 切換、完整中文日期與當日時間進度條。 | ✅ 已達成 |
| 📬 **5. Contact & Actions (聯絡與社群)** | 整合 GitHub 專案庫連結、Email 聯絡按鈕、線上在線狀態指示燈與自訂霓虹主題切換器。 | ✅ 已達成 |

---

## 🛠️ Technology Stack

- **Markup**: HTML5 (Semantic elements, accessibility ARIA attributes)
- **Styling**: Vanilla CSS3 (Custom properties / variables, Flexbox, Grid, Keyframe animations, Glassmorphism)
- **Scripting**: Modern JavaScript ES6+ (`Intl.DateTimeFormat`, DOM APIs, `localStorage`, `setInterval`)
- **Typography**: Google Fonts (*Outfit*, *JetBrains Mono*)
- **Hosting & CI/CD**: GitHub Pages & Git CLI

---

## 📂 Project Structure

```text
916testproject/
├── index.html       # Main semantic HTML structure & layout
├── style.css        # Design tokens, themes, glassmorphism & responsive rules
├── script.js        # Real-time clock engine, greeting logic & local state
├── avatar.jpg       # Profile avatar artwork
├── snapshot.png     # Application screenshot for demonstration
└── README.md        # Project documentation & homework summary
```

---

## 🚀 Running Locally

To run and preview the project on your local machine:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/stevenwujr/916testproject.git
   cd 916testproject
   ```

2. Start a local HTTP server (e.g., using Python):
   ```bash
   python -m http.server 8088
   ```

3. Open your browser and visit:
   ```text
   http://localhost:8088
   ```
   *(Or simply open `index.html` directly in any modern web browser).*

---

## 🎓 Summary of Today's Work (DIC 1 Reflection)

1. **AI-Assisted Full-Stack Prototyping**: Successfully translated high-level user prompts into a production-ready, aesthetically stunning web application within minutes.
2. **Modern CSS & UX Mastery**: Implemented modern web design techniques including glassmorphism, responsive grid layouts, and dynamic theme switching without relying on third-party frameworks.
3. **State Management & Persistence**: Learned client-side state handling with vanilla JavaScript and persistent browser storage (`localStorage`).
4. **Git & GitHub Pages Workflow**: Completed the entire loop from code generation to version control (`git add`, `git commit`, `git push`) and live deployment on GitHub Pages.
