/**
 * @author // Max Lindquist <ml227cu@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
    <style>
        h2 {
            color: white;
        }
        form {
            margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        label {
            color: white;
            margin-bottom: 10px;
        }
        input {
            margin-bottom: 10px;
            font-size: 16px;
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
    <h2> Enter your nickname </h2>
    <form id = nickname-form autocomplete = off>
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" name="nickname">
        <button type="submit">Submit</button>
    </form>
`

customElements.define('nickname-form',
  /**
   * Extends the HTMLElement
   */
  class extends HTMLElement {
    #nicknameForm
    #nickname
    /**
     * Creates an instance of the custom element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('#nickname-form')
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
      this.#nicknameForm.addEventListener('submit', (event) => {
        event.preventDefault()
        this.shadowRoot.querySelector('#nickname').value = this.shadowRoot.querySelector('#nickname').value.trim()
        if (typeof (this.shadowRoot.querySelector('#nickname').value) !== 'string' || this.shadowRoot.querySelector('#nickname').value === '') {
          this.shadowRoot.querySelector('#nickname').style.border = '1px solid red'
        } else {
          this.#nickname = this.shadowRoot.querySelector('#nickname').value
          this.dispatchEvent(new CustomEvent('nickname-submitted', { detail: this.#nickname }))
        }
      })
    }

    /**
     * Called when the element is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.#nicknameForm.removeEventListener('submit', (event) => { })
    }

    /**
     * Returns the nickname entered in the form.
     *
     * @returns {string} The nickname.
     */
    getNickname () {
      return this.#nickname
    }
  })
