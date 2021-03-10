const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    successMesage = 'Спасибо! Мы скоро с вами свяжемся';
  const forms = [...document.querySelectorAll('form')];
  const statusMessage = document.createElement('div');

  const setStyle = () => {
    const statusMessageStyle = document.createElement('style');
    statusMessageStyle.textContent = `
  .sk-wave {
    width: 6em;
    height: 4em;
    margin: auto;
    text-align: center;
    font-size: 1em;
  }

  .sk-wave .sk-rect {
    background-color: #337ab7;
    height: 100%;
    width: 0.5em;
    display: inline-block;
    animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
  }

  .sk-wave .sk-rect-1 {
    animation-delay: -1.2s;
  }

  .sk-wave .sk-rect-2 {
    animation-delay: -1.1s;
  }

  .sk-wave .sk-rect-3 {
    animation-delay: -1s;
  }

  .sk-wave .sk-rect-4 {
    animation-delay: -0.9s;
  }

  .sk-wave .sk-rect-5 {
    animation-delay: -0.8s;
  }

  @keyframes sk-wave-stretch-delay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }

    20% {
      transform: scaleY(1);
    }
  }
  `;
    document.head.append(statusMessageStyle);
  };

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body),
  });

  const formPostAction = (event, form) => {
    event.preventDefault();

    const elementsForm = [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
    const submitBtn = [...form.elements].reduce((accumulator, currentValue) => {
      if (currentValue.type === 'submit') {
        return currentValue;
      }
    });

    const formData = new Map();
    elementsForm.forEach(item => formData.set(item.name, item.value));
    const body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });

    submitBtn.setAttribute('disabled', '');
    elementsForm.forEach(item => item.value = '');

    statusMessage.classList.add('sk-wave');
    statusMessage.innerHTML = `
      <div class='sk-rect sk-rect-2'></div> 
      <div class='sk-rect sk-rect-3'></div> 
      <div class='sk-rect sk-rect-4'></div> 
      <div class='sk-rect sk-rect-1'></div> 
      <div class='sk-rect sk-rect-5'></div>
      `;
    form.insertAdjacentElement('beforeend', statusMessage);

    postData(body).then(request => {
      if (request.status === 200) {
        statusMessage.textContent = successMesage;
        statusMessage.style.color = 'white';
        statusMessage.classList.remove('sk-wave');
      } else {
        throw new Error(`Exception status ${request.status}`);
      }
    }).catch(error => {
      statusMessage.textContent = errorMessage;
      console.error(error);
    });
  };

  forms.forEach(form => {
    form.addEventListener('submit', event => {
      formPostAction(event, form);
    });
  });

  setStyle();
};

export default sendForm;