<div align="center">

# 🌙 음력 생일 계산기

### Lunar Birthday Calculator

<p align="center">
  <strong>나의 100세까지의 음력 생일을 계산하고,<br/>양력과 음력 생일이 일치하는 특별한 날을 찾아보세요!</strong>
</p>

<p align="center">
  <a href="https://bearholmes.github.io/lunar-calc/">
    <img src="https://img.shields.io/badge/demo-live-success?style=for-the-badge" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&logo=vite" alt="Vite" />
</p>

<p align="center">
  <a href="https://bearholmes.github.io/lunar-calc/">🚀 Live Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

</div>

---

## 💡 About

양력과 음력 생일이 같은 날이 있을까요? 🤔

이 프로젝트는 그런 궁금증에서 시작되었습니다. 출생일로부터 100년간의 음력/양력 생일을 계산하고, 두 날짜가 일치하는 특별한 날을 찾아줍니다. **그날은 분명히 존재합니다!** 직접 확인해보세요 😱

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔄 양력/음력 변환
한국 음력 달력 시스템을 사용한 날짜 변환

</td>
<td width="50%">

### 📅 윤달 지원
윤달(閏月) 계산을 포함한 완벽한 음력 지원

</td>
</tr>
<tr>
<td width="50%">

### 📊 100년 타임라인
출생년도부터 100년간의 생일 타임라인 자동 생성

</td>
<td width="50%">

### 🎯 일치 날짜 발견
양력과 음력 생일이 일치하는 특별한 날 확인

</td>
</tr>
</table>

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/bearholmes/lunar-calc.git
cd lunar-calc

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

서버가 시작되면 브라우저에서 `http://localhost:3000`을 열어주세요!

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width="48" height="48" alt="React" />
<br />React 19
</td>
<td align="center" width="20%">
<img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" width="48" height="48" alt="TypeScript" />
<br />TypeScript 5.9
</td>
<td align="center" width="20%">
<img src="https://vitejs.dev/logo.svg" width="48" height="48" alt="Vite" />
<br />Vite 6
</td>
<td align="center" width="20%">
<img src="https://vitest.dev/logo.svg" width="48" height="48" alt="Vitest" />
<br />Vitest 2.1
</td>
<td align="center" width="20%">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="48" height="48" alt="Tailwind CSS" />
<br />Tailwind CSS 3.4
</td>
</tr>
</table>

### Core Technologies

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 with Hooks |
| **Language** | TypeScript 5.9 (Strict Mode) |
| **Build Tool** | Vite 6 |
| **Linter/Formatter** | Biome 1.9 |
| **Testing** | Vitest + React Testing Library |
| **Documentation** | Storybook 8.6 |
| **Package Manager** | pnpm 8+ |
| **CSS Framework** | Tailwind CSS 3.4 + shadcn/ui |
| **Lunar Calendar** | holiday-kr |

## 📋 Prerequisites

시작하기 전에 다음 항목들이 설치되어 있는지 확인해주세요:

- **Node.js** v20 or higher
- **pnpm** v8 or higher

```bash
# Check versions
node --version  # v20.0.0 or higher
pnpm --version  # 8.0.0 or higher
```

## 🎯 Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm dev

# Open Storybook for component development
pnpm storybook
```

### Building

```bash
# Type check and build for production
pnpm build

# Preview production build locally
pnpm preview

# Build Storybook
pnpm build-storybook
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm vitest run

# Generate coverage report
pnpm test:coverage

# Open coverage UI
pnpm test:ui
```

### Code Quality

```bash
# Check code quality
pnpm lint

# Auto-fix issues
pnpm lint:fix

# Format code
pnpm format
```

## 📖 Storybook

컴포넌트 문서와 개발 환경을 Storybook에서 확인할 수 있습니다.

브라우저에서 `http://localhost:6006`을 열어주세요.

```bash
# Start Storybook
pnpm storybook
```

## ⚠️ Known Limitations

### 날짜 계산 범위

이 프로젝트는 **holiday-kr 라이브러리**를 사용하여 음력/양력 변환을 수행합니다.

**지원 연도 범위**: 1800년 ~ 2101년

- ✅ 1800-2101년: 정상 작동
- ❌ 2101년 이후: 계산 불가

## 🤝 Contributing

프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- TypeScript strict mode를 준수해주세요
- 모든 새로운 기능에는 테스트를 작성해주세요
- 커밋 메시지는 [Conventional Commits](https://www.conventionalcommits.org/) 형식으로 작성해주세요

## 📄 License

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조해주세요.

## 🙏 Credits

- **Icons**: [icons8](https://icons8.kr/)
- **Lunar Calendar Library**: [holiday-kr](https://github.com/Astro36/holiday-kr)

## 📞 Contact

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 열어주세요!

---

<div align="center">

Made with ❤️ by [bearholmes](https://github.com/bearholmes)

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!

</div>
