customElements.define('fds-input',
  class extends HTMLElement {
    constructor() {
      super();

      let id = this.getAttribute("id");
      let label = this.querySelector("label:first-of-type");
      let hint = this.querySelector("fds-hint:first-of-type");
      let error = this.getAttribute("data-error");
      
      if (!error) {
        this.innerHTML = `
        <div class="form-group">
        <label class="form-label" for="${id}">${label.innerHTML}</label>
        <span class="form-hint" id="${id}-hint">${hint?.innerHTML || ''}</span>
        <input class="form-input" id="${id}" name="${id}" type="text" aria-describedby="${id}-hint" />       
        </div>`;
      } else {
        this.innerHTML = `
        <div class="form-group form-error">
        <label class="form-label" for="${id}">${label.innerHTML}</label>
        <span class="form-hint" id="${id}-hint">${hint?.innerHTML || ''}</span>
        <span class="form-error-message" id="${id}-error">
        <span class="sr-only">Fejl:</span>${error}</span>
        <input class="form-input" id="${id}" name="${id}" type="text" aria-invalid="true" aria-describedby="${id}-hint ${id}-error" />       
        </div>`;
      }
      

      
    }
  }
);





customElements.define('fds-hint',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `<span>hint:</span>`;
    }
  }
);









customElements.define('person-details',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('person-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});

      const style = document.createElement('style');
      style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; }
      `;

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);

customElements.define('edit-word',
  class extends HTMLElement {
    constructor() {
      super();

      const shadowRoot = this.attachShadow({mode: 'open'});
      const form = document.createElement('form');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const style = document.createElement('style');
      style.textContent = 'span { background-color: #eef; padding: 0 2px }';

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(form);
      shadowRoot.appendChild(span);

      span.textContent = this.textContent;
      input.value = this.textContent;

      form.appendChild(input);
      form.style.display = 'none';
      span.style.display = 'inline-block';
      input.style.width = span.clientWidth + 'px';

      this.setAttribute('tabindex', '0');
      input.setAttribute('required', 'required');
      this.style.display = 'inline-block';

      this.addEventListener('click', () => {
        span.style.display = 'none';
        form.style.display = 'inline-block';
        input.focus();
        input.setSelectionRange(0, input.value.length)
      });

      form.addEventListener('submit', e => {
        updateDisplay();
        e.preventDefault();
      });

      input.addEventListener('blur', updateDisplay);

      function updateDisplay() {
        span.style.display = 'inline-block';
        form.style.display = 'none';
        span.textContent = input.value;
        input.style.width = span.clientWidth + 'px';
      }
    }
  }
);