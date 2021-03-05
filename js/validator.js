/* eslint-disable eol-last */
/* eslint-disable max-len */

class Validator {
  constructor({
    selector,
    pattern = {},
    method
  }) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    this.submitBtn = [...this.form.querySelectorAll('button')].reduce((accumulator, currentValue) => {
      if (currentValue.type === 'submit') {
        return currentValue;
      }
    });
    this.error = new Set();
    this.form.setAttribute('novalidate', '');
    this.submitBtn.setAttribute('disabled', '');
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
    this.form.addEventListener('submit', e => {
      this.elementsForm.forEach(elem => this.checkIt({
        target: elem
      }));
      e.preventDefault();

      if (this.error.size) {
        this.form.querySelector('button').setAttribute('disabled', '');
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return validatorMethod.notEmpty(elem) ? pattern.test(elem.value) : true;
      }
    };

    if (this.method) {
      const method = this.method[elem.type];
      if (method) {

        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    }

    return true;
  }

  checkIt(event) {
    this.elementsForm.forEach(target => {
      if (this.isValid(target)) {
        this.showSuccess(target);
        this.error.delete(target);
        if (!this.error.size) {
          this.form.querySelector('button').removeAttribute('disabled', '');
        }
      } else {
        this.showError(target);
        this.error.add(target);
        if (this.error.size) {
          this.form.querySelector('button').setAttribute('disabled', '');
        }
      }
    });
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Некорректные данные';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2 px solid green !important;
      }
      input.error {
        border: 2 px solid red !important;
      }
      .validator-error {
        color: red;
      }
    `;

    document.head.append(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /.{17}/;
    }
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}

const validator1 = new Validator({
  selector: '#form1',
  method: {
    'tel': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['pattern', 'email']
    ],
    'text': [
      ['notEmpty']
    ]
  }
});

validator1.init();

const validator2 = new Validator({
  selector: '#form2',
  method: {
    'tel': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['pattern', 'email']
    ],
    'text': [
      ['notEmpty']
    ]
  }
});

validator2.init();

const validator3 = new Validator({
  selector: '#form3',
  method: {
    'tel': [
      ['notEmpty'],
      ['pattern', 'phone']
    ],
    'email': [
      ['pattern', 'email']
    ],
    'text': [
      ['notEmpty']
    ]
  }
});

validator3.init();