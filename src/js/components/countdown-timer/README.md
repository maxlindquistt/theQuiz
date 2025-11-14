# Countdown Timer Web Component

This is a custom web component that implements a countdown timer. The timer counts down from a specified time and emits an event when the time is up.

## Features

- Customizable countdown time via the `time` attribute.
- Emits a `timer-ended` event when the countdown reaches zero.
- Methods to start, stop, and reset the timer.
- Tracks elapsed time.

## Usage

To use the countdown timer component, include it in your HTML file and set the `time` attribute to the desired countdown time in seconds.

```html
<countdown-timer time="60"></countdown-timer>
```

## Methods

### `startTimer()`

Starts the countdown timer.

### `stopTimer()`

Stops the countdown timer.

### `resetTimer()`

Resets the countdown timer.

### `getElapsedTime()`

Returns the elapsed time in seconds.

## Events

### `timer-ended`

Emitted when the countdown reaches zero.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Countdown Timer Example</title>
</head>
<body>
    <countdown-timer time="10"></countdown-timer>

    <script type="module">
        import './path/to/countdown-timer.js';

        const timer = document.querySelector('countdown-timer');
        timer.addEventListener('timer-ended', () => {
            alert('Time is up!');
        });
    </script>
</body>
</html>
```