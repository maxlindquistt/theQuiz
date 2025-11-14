/**
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <h1>The Quiz</h1>
    <nickname-form></nickname-form>
    <quiz-question></quiz-question>
    <countdown-timer></countdown-timer>
    `

customElements.define('quiz-application',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    nextUrl = 'https://courselab.lnu.se/quiz/question/1'
    #quizQuestion
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('quiz-question').style.display = 'none'
      this.shadowRoot.querySelector('countdown-timer').style.display = 'none'
      this.shadowRoot.querySelector('nickname-form').addEventListener('nickname-submitted', () => {
        this.shadowRoot.querySelector('nickname-form').style.display = 'none'
        this.shadowRoot.querySelector('quiz-question').style.display = 'inline'
        this.shadowRoot.querySelector('countdown-timer').style.display = 'inline'
        this.getNextQuestion()
      })

      this.#quizQuestion.addEventListener('answer-submitted', (event) => {
        event.preventDefault()
        this.postAndGet(event.detail)
      })
      this.shadowRoot.addEventListener('timer-ended', () => {
        this.dispatchEvent(new CustomEvent('timer-ended', { bubbles: true }))
      })
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.shadowRoot.querySelector('nickname-form').removeEventListener('nickname-submitted', () => {
        this.shadowRoot.querySelector('nickname-form').style.display = 'none'
      })
      this.#quizQuestion.removeEventListener('answer-submitted', (event) => {
        event.preventDefault()
        this.postAndGet(event.detail)
      })
      this.shadowRoot.removeEventListener('timer-ended', () => {
        this.dispatchEvent(new CustomEvent('timer-ended', { bubbles: true }))
      })
    }

    /**
     * Gets the next question from the server and displays it.
     */
    async getNextQuestion () {
      await window.fetch(this.nextUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (!data.limit) {
            this.shadowRoot.querySelector('countdown-timer').setAttribute('time', '20')
          } else {
            this.shadowRoot.querySelector('countdown-timer').setAttribute('time', data.limit)
          }
          this.shadowRoot.querySelector('quiz-question').displayQuestion(data)
          this.nextUrl = data.nextURL
          console.log(this.nextUrl)
        })
    }

    /**
     * Posts the users answer to the server.
     *
     * @param {answer} answer - The users answer to be posted.
     */
    async postAnswer (answer) {
      await window.fetch(this.nextUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answer })
      })
        .then(response => {
          if (!response.ok) {
            this.dispatchEvent(new CustomEvent('wrong-answer', { bubbles: true }))
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          if (data.nextURL) {
            this.nextUrl = data.nextURL
          } else {
            this.dispatchEvent(new CustomEvent('quiz-completed', { bubbles: true }))
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }

    /**
     * Posts the users answer to the server and gets the next question.
     *
     * @param {answer} answer - The users answer to be posted.
     */
    async postAndGet (answer) {
      await this.postAnswer(answer)
      await this.getNextQuestion()
    }

    /**
     * Resets the quiz application.
     */
    async resetQuiz () {
      this.shadowRoot.querySelector('nickname-form').style.display = 'inline'
      this.shadowRoot.querySelector('quiz-question').style.display = 'none'
      this.shadowRoot.querySelector('countdown-timer').style.display = 'none'
      this.nextUrl = 'https://courselab.lnu.se/quiz/question/1'
      await this.getNextQuestion()
    }
  })
