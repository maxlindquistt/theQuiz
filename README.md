# theQuiz

theQuiz is a small browser-based quiz application built with plain HTML, CSS and JavaScript. It was created during my first year as a web development student as part of the course 1DV025 at Linnaeus University.

This project served as an exercise in DOM manipulation, event handling and simple client-side state management (for example storing high scores in localStorage). The app includes a timed quiz flow, per-question feedback, a nickname form for high scores, and a simple high-score view.

## Features
- Multiple-choice quiz questions
- Countdown timer for the quiz
- Per-question feedback and scoring
- Nickname form and persistent high scores

## Installation
Prerequisites: Node.js (for the development server) and npm.

1. Clone this repository and change into the project folder:

	git clone <repo-url>
	cd theQuiz

2. Install dependencies:

	npm install

3. Start the development server (Vite):

	npm run dev

	After the server starts, open the URL it shows (commonly http://localhost:5173) in your browser.

## Project structure (important files)
- `src/index.html` — main HTML
- `src/js/index.js` — app entry
- `src/js/components/` — small components: quiz, timer, nickname form, and high score

## Notes
- This app was implemented as a learning project during the 1DV025 course at Linnaeus University (first-year web development). It's intentionally small and focused on client-side JS fundamentals.
- License: see the `LICENSE` file.
