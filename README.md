<div align="center">

# 🚀 ToolNow

### Free online tools designed to be fast, simple, and accessible — no sign-up, just the tools you need.

A collection of fast, privacy-friendly, mobile-first utilities for everyday tasks.
Everything runs **directly in your browser** — no backend, no accounts, and none of your data ever leaves your device.

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-toolnow.vercel.app-6366F1?style=for-the-badge)](https://toolnow.vercel.app/)

<br/>

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](#-contributing)

[![GitHub stars](https://img.shields.io/github/stars/hjanoti/toolnow?style=social)](https://github.com/hjanoti/toolnow/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/hjanoti/toolnow?style=social)](https://github.com/hjanoti/toolnow/network/members)
[![GitHub last commit](https://img.shields.io/github/last-commit/hjanoti/toolnow?style=flat-square&color=blueviolet)](https://github.com/hjanoti/toolnow/commits)

</div>

<br/>

<div align="center">
  <img src="https://github.com/hjanoti/toolnow/raw/main/public/preview.png" alt="ToolNow preview" width="85%" />
</div>

<br/>

---

## 📖 Table of Contents

<table>
<tr>
<td valign="top" width="50%">

- [✨ Why ToolNow](#-why-toolnow)
- [🛠️ Categories](#️-categories)
- [🚀 Tech Stack](#-tech-stack)
- [📦 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)

</td>
<td valign="top" width="50%">

- [⚙️ Environment Variables](#️-environment-variables)
- [📁 Project Structure](#-project-structure)
- [➕ Adding a New Tool](#-adding-a-new-tool)
- [🌍 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

</td>
</tr>
</table>

---

## ✨ Why ToolNow

<table>
<tr>
<td width="33%" valign="top" align="center">

### ⚡
**Blazing Fast**
Minimal JS, near-instant load times on every device

</td>
<td width="33%" valign="top" align="center">

### 🔒
**Privacy-First**
100% client-side processing — nothing ever touches a server

</td>
<td width="33%" valign="top" align="center">

### 📱
**Mobile-First**
Designed to feel native on phones, not squeezed onto them

</td>
</tr>
<tr>
<td width="33%" valign="top" align="center">

### 🆓
**Always Free**
No paywalls, no premium tier, no feature gating

</td>
<td width="33%" valign="top" align="center">

### 🚫
**Zero Friction**
No sign-up, no login, no email — just open and use

</td>
<td width="33%" valign="top" align="center">

### 🧩
**Extensible**
Ship a new tool in three files — see below

</td>
</tr>
</table>

---

## 🛠️ Categories

<div align="center">

| | Category | Examples |
|:---:|---|---|
| 💰 | **Finance Calculators** | Loan EMI, compound interest, tax estimators |
| 📝 | **Text Utilities** | Case converters, word counters, diff checkers |
| 👨‍💻 | **Developer Tools** | JSON formatter, encoders/decoders, regex tester |
| 🖼️ | **Image Tools** | Resize, compress, format conversion |
| 📄 | **PDF Utilities** | Merge, split, compress |
| 🔧 | **Generators & Converters** | Password generator, unit converter, QR codes |

</div>

---

## 🚀 Tech Stack

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

</div>

---

## 📦 Getting Started

### Prerequisites

- Node.js **18.18+** (20+ recommended)
- npm (or pnpm / yarn / bun — your call)

### 1. Clone the repository

```bash
git clone https://github.com/hjanoti/toolnow.git
cd toolnow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint checks |
| `npm run typecheck` | Run TypeScript type checks |
| `npm test` | Run the test suite (Vitest) |

---

## ⚙️ Environment Variables

> All integrations below are **optional** — the app runs perfectly fine without them.

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL used for metadata, sitemap, and canonical links |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense client ID |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for the contact form |

---

## 📁 Project Structure

```text
toolnow/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/
│   │   └── tools/           # Individual tool UI components + registry
│   ├── lib/
│   │   └── tools/           # Tool definitions (metadata, config)
│   └── styles/               # Global styles / Tailwind config
├── public/                   # Static assets
├── .env.example
└── package.json
```

---

## ➕ Adding a New Tool

Routes, metadata, sitemap, and internal links are all generated automatically — you only touch three files:

<table>
<tr><td width="40px" align="center"><b>1</b></td><td>Add a <code>ToolDefinition</code> in <code>src/lib/tools/</code></td></tr>
<tr><td align="center"><b>2</b></td><td>Create the component in <code>src/components/tools/</code></td></tr>
<tr><td align="center"><b>3</b></td><td>Register it in <code>src/components/tools/registry.tsx</code></td></tr>
</table>

That's it — the page, route, and SEO metadata wire themselves up. ⚙️

---

## 🌍 Deployment

<div align="center">

ToolNow is deployed on **[Vercel](https://vercel.com/)** — production: **[toolnow.vercel.app](https://toolnow.vercel.app/)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hjanoti/toolnow)

</div>

**Manual setup:**
1. Fork this repository
2. Import it into [Vercel](https://vercel.com/new)
3. Add environment variables (optional)
4. Deploy 🚀

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are always welcome!

```bash
# 1. Fork the repository, then:
git checkout -b feature/my-new-tool
git commit -m "Add: my new tool"
git push origin feature/my-new-tool
# 2. Open a Pull Request
```

Please run `npm run lint` and `npm test` before submitting a PR.

---

## 📄 License

Licensed under the **[MIT License](LICENSE)** — free to use, modify, and distribute.

---

<div align="center">

## 👨‍💻 Author

**Heera Singh Janoti**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hjanoti)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/heera-singh-janoti/)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://myedhub.netlify.app/)

<br/>

### If ToolNow saved you a click or two, consider giving it a ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=hjanoti/toolnow&type=Date)](https://star-history.com/#hjanoti/toolnow&Date)

</div>