/**
 * The main script file of the application.
 *
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

import './components/nickname-form/index.js'
import './components/countdown-timer/index.js'
import './components/quiz-question/index.js'
import './components/quiz-application/index.js'
import './components/high-score/index.js'

let currentUsersTime = 0

const container = document.getElementById('quiz-container')
const quizApp = document.createElement('quiz-application')
quizApp.setAttribute('id', 'quiz-application')
container.appendChild(quizApp)
const nicknameInput = quizApp.shadowRoot.querySelector('nickname-form').shadowRoot.querySelector('input')
nicknameInput.focus()

/**
 * Handles the event when a wrong answer is given.
 */
const handleWrongAnswer = () => {
  const quizAppElement = container.querySelector('quiz-application')
  quizAppElement.shadowRoot.querySelector('countdown-timer').resetTimer()
  quizAppElement.shadowRoot.querySelector('countdown-timer').stopTimer()
  container.removeChild(quizAppElement)
  displayFailText()
}

/**
 * Handles the event when the retry button is clicked.
 */
const handleRetryClicked = () => {
  const quizApp = document.createElement('quiz-application')
  container.replaceChildren(quizApp)
  quizApp.shadowRoot.querySelector('nickname-form').shadowRoot.querySelector('input').focus()
  console.log('retry-clicked')
}

/**
 * Handles the event when the quiz is completed.
 */
const handleQuizCompleted = () => {
  const quizAppElement = container.querySelector('quiz-application')
  currentUsersTime = quizAppElement.shadowRoot.querySelector('countdown-timer').getElapsedTime()
  const currentNickname = quizAppElement.shadowRoot.querySelector('nickname-form').getNickname()

  const existingTime = parseInt(window.localStorage.getItem(currentNickname))
  console.log(existingTime)
  console.log(currentUsersTime)

  if (isNaN(existingTime) || currentNickname === null || existingTime > currentUsersTime) {
    window.localStorage.setItem(currentNickname, currentUsersTime)
  }

  quizAppElement.shadowRoot.querySelector('countdown-timer').resetTimer()
  quizAppElement.shadowRoot.querySelector('countdown-timer').stopTimer()

  container.removeChild(quizAppElement)

  const highScoreElement = document.createElement('high-score')
  container.appendChild(highScoreElement)

  const yourScore = document.createElement('p')
  yourScore.textContent = `Your score: ${currentUsersTime}`
  container.appendChild(yourScore)

  highScoreElement.addEventListener('retry-clicked', () => {
    handleRetryClicked()
  })
}

/**
 * Handles the event when the timer ends.
 */
const handleTimerEnded = () => {
  const quizAppElement = container.querySelector('quiz-application')
  quizAppElement.shadowRoot.querySelector('countdown-timer').stopTimer()
  quizAppElement.shadowRoot.querySelector('countdown-timer').resetTimer()
  container.removeChild(quizAppElement)
  displayFailText()
  console.log('timer-ended')
}

/**
 * Displays the fail text when the user fails the quiz.
 */
const displayFailText = () => {
  const failText = document.createElement('h2')
  failText.textContent = 'You failed the quiz! Try again!'
  container.appendChild(failText)
  const highScoreElement = document.createElement('high-score')
  container.appendChild(highScoreElement)
}

container.addEventListener('wrong-answer', handleWrongAnswer)
container.addEventListener('retry-clicked', handleRetryClicked)
container.addEventListener('quiz-completed', handleQuizCompleted)
container.addEventListener('timer-ended', handleTimerEnded)
