/**
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <style>
        #high-score {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 50%;
            width: 100%;
            background-color: #333;
            color: white;

        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-bottom: 10px;
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
    </style>
    <div id="high-score">
        <h1>High Score</h1>
        <ul></ul>
        <button id="try-again">Try again!</button>
    </div>
`
customElements.define('high-score',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #keypressHandler

    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
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
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.getElementById('try-again').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('retry-clicked', { bubbles: true }))
      })

      /**
       * Handles the keypress event and triggers the click event on the try-again button if Enter is pressed.
       *
       * @param {KeyboardEvent} event The keypress event.
       */
      this.#keypressHandler = (event) => {
        if (event.key === 'Enter') {
          this.shadowRoot.getElementById('try-again').click()
        }
      }

      window.addEventListener('keypress', this.#keypressHandler)

      const scores = this.orderScores()
      this.renderScores(scores)
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      window.removeEventListener('keypress', this.#keypressHandler)
      this.shadowRoot.getElementById('try-again').removeEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('retry-clicked', { bubbles: true }))
      })
    }

    /**
     * Orders the scores stored in localStorage and returns the top 5 scores.
     *
     * @returns {Array} The array of top 5 score objects.
     */
    orderScores () {
      const scores = Object.entries(localStorage)
        .map(([key, value]) => ({ key, value: parseInt(value) }))
        .sort((a, b) => a.value - b.value)
        .slice(0, 5)
      return scores
    }

    /**
     * Renders the scores in the high score list.
     *
     * @param {Array} scores The array of score objects to render.
     */
    renderScores (scores) {
      const ul = this.shadowRoot.querySelector('ul')
      scores.forEach(score => {
        const li = document.createElement('li')
        li.textContent = `${score.key}: ${score.value} seconds`
        ul.appendChild(li)
      })
    }
  })
