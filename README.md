# theQuiz

theQuiz is a small browser-based quiz application built with plain HTML, CSS and JavaScript. It was created during my first year as a web development student as part of the course 1DV025 at Linnaeus University.

This project served as an exercise in DOM manipulation, event handling and simple client-side state management (for example storing high scores in localStorage). The app includes a timed quiz flow, per-question feedback, a nickname form for high scores, and a simple high-score view.

## Features
- Multiple-choice quiz questions
- Countdown timer for the quiz
- Per-question feedback and scoring
- Nickname form and persistent high scores

## Installation
Prerequisites

- Node.js (v14 or newer) and npm. You can verify installed versions with:

```bash
node -v
npm -v
```

Quick start (bash)

```bash
# clone the repo (replace <your-username> or use your preferred remote URL)
git clone https://github.com/<your-username>/theQuiz.git
cd theQuiz

# install dependencies
npm install

# start the Vite dev server
npm run dev
```

After the dev server starts, open the URL it prints (commonly http://localhost:5173) in your browser.

## Project structure (important files)
- `src/index.html` — main HTML
- `src/js/index.js` — app entry
- `src/js/components/` — small components: quiz, timer, nickname form, and high score

## Notes
- This app was implemented as a learning project during the 1DV025 course at Linnaeus University (first-year web development). It's intentionally small and focused on client-side JS fundamentals.
- License: see the `LICENSE` file.
