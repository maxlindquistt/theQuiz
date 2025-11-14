# Quiz Application Web Component

This repository contains the `quiz-application` web component, which is a part of an interactive quiz application. The component is built using vanilla JavaScript and Web Components API.

## Features

- **Nickname Form**: Allows users to enter their nickname before starting the quiz.
- **Quiz Question**: Displays quiz questions fetched from a server.
- **Countdown Timer**: Shows a countdown timer for each question.

## Usage

To use the `quiz-application` component, include it in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Application</title>
</head>
<body>
    <quiz-application></quiz-application>
    <script src="path/to/quiz-application.js"></script>
</body>
</html>
```

## Methods

### `connectedCallback()`

Called when the element is connected to the DOM. Initializes event listeners and hides the quiz question and countdown timer until the nickname is submitted.

### `disconnectedCallback()`

Called when the element is disconnected from the DOM. Removes event listeners.

### `getNextQuestion()`

Fetches the next quiz question from the server and displays it.

### `postAnswer(answer)`

Posts the user's answer to the server.

### `postAndGet(answer)`

Posts the user's answer to the server and fetches the next question.

### `resetQuiz()`

Resets the quiz application to its initial state.

## Events

- `nickname-submitted`: Triggered when the user submits their nickname.
- `answer-submitted`: Triggered when the user submits an answer.
- `timer-ended`: Triggered when the countdown timer ends.
- `wrong-answer`: Triggered when the user submits a wrong answer.
- `quiz-completed`: Triggered when the quiz is completed.
