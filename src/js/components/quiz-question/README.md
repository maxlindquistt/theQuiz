# Quiz Question Web Component

This `quiz-question` web component is designed to display a quiz question with multiple choice or text input alternatives. It allows users to submit their answers and dispatches an event with the selected answer.

## Features

- Displays a quiz question.
- Supports multiple choice and text input alternatives.
- Dispatches a custom event with the submitted answer.

## Usage

To use the `quiz-question` web component, include it in your HTML file:

```html
<quiz-question></quiz-question>
```

### Displaying a Question

To display a question, call the `displayQuestion` method with the question data:

```javascript
const quizQuestionElement = document.querySelector('quiz-question');
const questionData = {
    question: 'What is the capital of France?',
    alternatives: {
        a: 'Paris',
        b: 'London',
        c: 'Berlin',
        d: 'Madrid'
    }
};
quizQuestionElement.displayQuestion(questionData);
```

### Listening for the Answer Submission

Add an event listener to handle the `answer-submitted` event:

```javascript
quizQuestionElement.addEventListener('answer-submitted', (event) => {
    console.log('Submitted answer:', event.detail);
});
```

## Attributes

This component does not observe any attributes.

## Methods

### `displayQuestion(questionData)`

Displays the provided question data.

- `questionData` (object): The question data to be displayed. It should have the following structure:
    - `question` (string): The question text.
    - `alternatives` (object): An object containing the alternatives, where keys are the alternative identifiers and values are the alternative texts.

## Events

### `answer-submitted`

Dispatched when the user submits an answer.

- `detail` (string): The submitted answer.

## Styling

The component includes default styles for layout and appearance. You can customize the styles by modifying the CSS within the component.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Question Example</title>
</head>
<body>
    <quiz-question></quiz-question>

    <script>
        const quizQuestionElement = document.querySelector('quiz-question');
        const questionData = {
            question: 'What is the capital of France?',
            alternatives: {
                a: 'Paris',
                b: 'London',
                c: 'Berlin',
                d: 'Madrid'
            }
        };
        quizQuestionElement.displayQuestion(questionData);

        quizQuestionElement.addEventListener('answer-submitted', (event) => {
            console.log('Submitted answer:', event.detail);
        });
    </script>
</body>
</html>
```

This example demonstrates how to use the `quiz-question` web component to display a question and handle the answer submission event.
