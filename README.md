# 🌊 jqbtx-web (qBittorrent Web UI) [WIP]

> 🚧 **Work In Progress**: This project is currently under active development. The foundational Design System is built, and the core application layout is underway.

**jqbtx-web** is a modern, blazing-fast, and highly customized alternative Web User Interface for qBittorrent. It is built with a focus on developer experience (DX), clean architecture, and a beautiful, consistent dark mode experience inspired by the **Tokyo Night** theme.

## ✨ Features

- **Custom Design System**: A bespoke, zero-dependency UI component library (`@jqbtx/ui`) built from scratch.
- **Strict API Philosophy**: Components like `Card`, `Modal`, and `Table` are designed with strict props for robust, error-free implementation and absolute visual consistency.
- **Tokyo Night Theme**: A beautiful, eye-friendly dark mode default palette.
- **Lightning Fast**: Powered by **Vite** for near-instant HMR and fast builds.
- **Monorepo Architecture**: Structured with **Turborepo** to separate the core application from the reusable UI library.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Variants**: [CVA (Class Variance Authority)](https://cva.style/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Workspace**: [Turborepo](https://turbo.build/)

## 📂 Project Structure

This project uses a monorepo setup to cleanly separate concerns:

```text
jqbtx-web/
├── apps/
│   └── web/              # The main Vite React application
│       ├── src/pages/    # App routes and Design System showcases
│       └── ...
├── packages/
│   ├── ui/               # Custom UI Component Library (@jqbtx/ui)
│   │   ├── src/components/
│   │   └── tailwind.config.js # Shared design tokens (Tokyo Night)
│   └── eslint-config/    # Shared linting rules
└── package.json
```

## 🧱 The `@jqbtx/ui` Design System

The core of this project relies on a strictly typed, bespoke UI library. 
Current available components include:
`Badge`, `Button`, `Card`, `Checkbox`, `Input`, `Modal`, `ProgressBar`, `Select`, `Switch`, `Table`, and `Tabs`.

To view the components in isolation, run the project and navigate to the automated **Design System Showcase** routing in the sidebar.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone the repository:
```bash
git clone git@github.com:YourUsername/jqbtx-web.git
cd jqbtx-web
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server (runs both the web app and UI package in watch mode):
```bash
pnpm run dev
```

## 🗺️ Roadmap / Next Steps

- [x] Set up Turborepo and Vite workspace.
- [x] Establish Tailwind CSS theme (Tokyo Night).
- [x] Build core UI components (Inputs, Buttons, Badges...).
- [x] Build complex UI components (Strict API Table, Modal, Card).
- [ ] Implement main application layout (Sidebar, Topbar, Main Content Area).
- [ ] Integrate qBittorrent Web API (Authentication, Torrent List, Actions).
- [ ] Add advanced settings and filtering views.

---
*Built with passion and clean code.*