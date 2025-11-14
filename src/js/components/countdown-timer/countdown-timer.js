/**
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <div id="countdown-timer"></div>
`

customElements.define('countdown-timer',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #countDown = true
    #timerElement
    #intervalId
    #elapsedTime = 0
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#timerElement = this.shadowRoot.getElementById('countdown-timer')
      this.#intervalId = null
    }

    /**
     * Returns an array of attributes to be observed for changes.
     *
     * @returns {string[]} The list of attributes to be observed.
     */
    static get observedAttributes () {
      return ['time']
    }

    /**
     * Called when one of the observed attributes changes.
     *
     * @param {string} name The name of the attribute that changed.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if ((name === 'time' && oldValue !== newValue) || newValue === '20') {
        this.startTimer()
      }
    }

    /**
     * Called when the element is connected to the DOM.
     */
    connectedCallback () {
      const time = this.getAttribute('time')
      if (time) {
        this.updateDisplay(parseInt(time, 10))
        this.startTimer()
      }
    }

    /**
     * Starts the timer.
     */
    startTimer () {
      this.updateTime()
    }

    /**
     * Updates the time attribute every second.
     */
    updateTime () {
      if (this.#countDown === true) {
        if (this.#intervalId) {
          clearInterval(this.#intervalId)
        }

        let time = parseInt(this.getAttribute('time'), 10)
        this.updateDisplay(time)

        this.#intervalId = setInterval(() => {
          time--
          this.#elapsedTime++
          this.updateDisplay(time)
          console.log(this.#elapsedTime)

          if (time === 0) {
            this.dispatchEvent(new CustomEvent('timer-ended', { bubbles: true }))
            clearInterval(this.#intervalId)
            this.#timerElement.innerHTML = 'Time is up!'
          }
        }, 1000)
      }
    }

    /**
     * Updates the time attribute every second.
     *
     * @param {number} seconds The number of seconds left.
     */
    updateDisplay (seconds) {
      this.#timerElement.innerHTML = 'Time left: ' + (seconds)
    }

    /**
     * Resets the timer.
     */
    resetTimer () {
      this.#countDown = true
      clearInterval(this.#intervalId)
      this.#elapsedTime = 0
      console.log('timer test')
    }

    /**
     * Gets the elapsed time.
     *
     * @returns {number} The elapsed time in seconds.
     */
    getElapsedTime () {
      return this.#elapsedTime
    }

    /**
     * Stops the timer.
     */
    stopTimer () {
      this.#countDown = false
      clearInterval(this.#intervalId)
    }
  })
