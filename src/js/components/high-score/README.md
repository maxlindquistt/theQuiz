# High Score Web Component

This `high-score` web component displays a list of high scores and provides a button to retry the game. It is designed to be used in a web application to show the top scores stored in the browser's `localStorage`.

## Features

- Displays a list of top 5 high scores.
- Provides a "Try again!" button to restart the game.
- Listens for the Enter key to trigger the retry button.

## Usage

To use the `high-score` component, include it in your HTML file:

```html
<high-score></high-score>
```

## Methods

### `orderScores()`

Orders the scores stored in `localStorage` and returns the top 5 scores.

### `renderScores(scores)`

Renders the scores in the high score list.

## Events

### `retry-clicked`

Dispatched when the "Try again!" button is clicked.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>High Score Component</title>
</head>
<body>
    <high-score></high-score>

    <script src="path/to/high-score.js"></script>
</body>
</html>
```

## Styling

The component includes default styles for the high score list and the retry button. You can customize these styles by modifying the CSS within the component's template.