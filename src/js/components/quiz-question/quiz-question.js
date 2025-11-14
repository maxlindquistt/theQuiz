/**
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <style>
        #quiz-question {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 300px;
            width: 100%;
            background-color: #333;
            color: white;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        #alternatives-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        input[type="radio"] {
            margin-right: 10px;
            margin-bottom: 10px;
            margin-top: 10px;
        }

        input[type="text"] {
            margin-bottom: 10px;
            margin-top: 10px;
        }

        #quiz-question label {
            margin-bottom: 20px;
            margin-top: 100px;
            padding: 10px;
        }
    </style>
    <div id="quiz-question">
    <form id= quiz-form autocomplete = off require autofocus>
        <label id=question-label for="question"></label>
        <div id=alternatives-container></div>
        <button type="submit">Submit</button>
    </div>
    `
customElements.define('quiz-question',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #question
    #quizForm
    #alternativesContainer
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#question = this.shadowRoot.getElementById('question-label')
      this.#quizForm = this.shadowRoot.getElementById('quiz-form')
      this.#alternativesContainer = this.shadowRoot.getElementById('alternatives-container')
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes () {
      return []
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.#quizForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const selectedAlternative = this.shadowRoot.querySelector('input[name="alternative"]:checked')
        const answer = selectedAlternative ? selectedAlternative.value : this.shadowRoot.querySelector('#answer').value
        this.dispatchEvent(new CustomEvent('answer-submitted', { detail: answer }))
      })
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
    }

    /**
     * Display the question.
     *
     * @param {object} questionData - The question to be displayed.
     */
    displayQuestion (questionData) {
      this.#question.textContent = questionData.question
      this.#alternativesContainer.innerHTML = ''

      if (questionData.alternatives && (Object.keys(questionData.alternatives).length > 1 && Object.keys(questionData.alternatives).length < 11)) {
        Object.keys(questionData.alternatives).forEach((key, index) => {
          const alternative = questionData.alternatives[key]
          const alternativeElement = document.createElement('div')
          alternativeElement.innerHTML = `
            <input type="radio" id="${key}" name="alternative" value="${key}">
            <label for="${key}">${alternative}</label>
          `
          this.#alternativesContainer.appendChild(alternativeElement)
          if (index === 0) {
            alternativeElement.querySelector('input').focus()
          }
        })
      } else {
        this.#alternativesContainer.innerHTML = `
            <input type="text" id="answer" name="answer">
        `
        this.#alternativesContainer.querySelector('input').focus()
      }
    }
  })
