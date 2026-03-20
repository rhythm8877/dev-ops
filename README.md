##Demo Change

# DevOps Task Manager

A modern task management application built with **React** and **Vite**, demonstrating DevOps best practices including CI/CD pipelines, automated testing, code linting, and deployment automation.

## Features

- ✅ Create, toggle, and delete tasks
- 🔍 Filter tasks by status (all, active, completed)
- 🌐 API integration with RESTful endpoints
- 📱 Responsive UI with modern dark theme
- 🚀 Automated CI/CD pipeline
- 🧪 Comprehensive test coverage (unit, integration, E2E)

## Tech Stack

| Category | Tools |
|----------|-------|
| **Frontend** | React 18, Vite 5 |
| **Testing** | Jest, React Testing Library, Playwright |
| **Linting** | ESLint, Prettier |
| **CI/CD** | GitHub Actions |
| **Deployment** | AWS EC2 via SSH |
| **Dependencies** | Dependabot |

## Architecture

```
┌─────────────────────────────────────────┐
│                Browser                   │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  Header  │  │ TaskForm │  │ Footer │ │
│  └─────────┘  └──────────┘  └────────┘ │
│       ┌──────────────────────┐          │
│       │      TaskList        │          │
│       │   ┌────┐ ┌────┐     │          │
│       │   │Task│ │Task│ ... │          │
│       │   └────┘ └────┘     │          │
│       └──────────────────────┘          │
└─────────────────┬───────────────────────┘
                  │ API Service (fetch)
                  ▼
         ┌────────────────┐
         │  REST API       │
         │ (JSONPlaceholder)│
         └────────────────┘
```

### Component-Based Architecture

- **Components** handle UI rendering and user interactions
- **Services** manage API communication and data fetching
- **Tests** organized by type: unit → integration → E2E

### Data Flow

1. `App.jsx` manages global state (tasks, filters, loading)
2. `TaskForm` dispatches new tasks to App state
3. `TaskList` renders filtered tasks from App state
4. `api.js` handles async API operations

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/rhythm8877/dev-ops.git
cd dev-ops
npm install
```

### Development

```bash
npm run dev
```

### Running Tests

```bash
# Unit & Integration tests
npm test

# Test with coverage
npm run test:coverage

# E2E tests (requires build first)
npm run build
npm run test:e2e
```

### Linting & Formatting

```bash
# Run linter
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format
npm run format
```

## CI/CD Pipeline

The GitHub Actions pipeline runs on every push and pull request:

```
┌──────────┐     ┌──────────┐     ┌─────────┐     ┌─────────┐
│   Lint   │────▶│   Test   │────▶│   E2E   │     │  Build  │
│ ESLint/  │     │ Jest/RTL │     │Playwright│     │  Vite   │
│ Prettier │     │          │     │          │     │         │
└──────────┘     └──────────┘     └─────────┘     └─────────┘
                       │                                │
                       └──────────────┬─────────────────┘
                                      ▼
                              ┌──────────────┐
                              │  Deploy EC2  │
                              │ (main only)  │
                              └──────────────┘
```

### Workflow Details

1. **Lint** → ESLint checks + Prettier format verification
2. **Test** → Jest unit + integration tests with coverage
3. **E2E** → Playwright browser tests
4. **Build** → Vite production build
5. **Deploy** → SSH to EC2, pull code, build, restart (main branch only)

## Idempotent Scripts

All deployment scripts are idempotent — safe to run multiple times:

```bash
# Setup script - conditional installs, mkdir -p
bash scripts/setup.sh

# Deploy script - graceful stop/start, mkdir -p
bash scripts/deploy.sh
```

**Examples of idempotency:**
- `mkdir -p project` instead of `mkdir project`
- `pm2 stop app 2>/dev/null || true` — won't fail if not running
- Checking `if [ ! -f .env ]` before creating files

## Dependabot

Automated dependency updates configured for:
- **npm packages** — weekly on Monday
- **GitHub Actions** — weekly on Monday

## Project Structure

```
dev-ops/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # CI pipeline
│   │   └── deploy.yml      # EC2 deployment
│   └── dependabot.yml      # Auto dependency updates
├── src/
│   ├── components/
│   │   ├── Header.jsx      # App header
│   │   ├── Footer.jsx      # App footer
│   │   ├── TaskList.jsx     # Task list display
│   │   └── TaskForm.jsx     # Add task form
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── __tests__/
│   │   ├── App.test.jsx     # Unit tests
│   │   ├── api.test.js      # API unit tests
│   │   └── integration.test.jsx  # Integration tests
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.jsx             # React entry point
├── e2e/
│   └── app.spec.js          # Playwright E2E tests
├── scripts/
│   ├── setup.sh             # Idempotent setup
│   └── deploy.sh            # Idempotent deploy
├── .eslintrc.cjs            # ESLint config
├── .prettierrc              # Prettier config
├── jest.config.cjs          # Jest config
├── playwright.config.js     # Playwright config
├── vite.config.js           # Vite config
└── package.json
```

## Design Decisions

- **Vite** over CRA for faster development builds and smaller production bundles
- **Jest + React Testing Library** for user-centric component testing
- **Playwright** for cross-browser E2E testing
- **ESLint + Prettier** to enforce consistent code style
- **JSONPlaceholder** as mock API for demonstration purposes
- **pm2** for production process management on EC2
- **Dependabot** to keep dependencies up to date automatically

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Jest + Vite ESM compatibility | Babel config for CJS transform in test env |
| CI pipeline ordering | Job dependencies with `needs` keyword |
| Idempotent deployments | Conditional checks, `mkdir -p`, graceful error handling |
| API reliability in tests | Mocked fetch calls in unit/integration tests |

## Author

**Rhythm Jain** — [GitHub](https://github.com/rhythm8877)
