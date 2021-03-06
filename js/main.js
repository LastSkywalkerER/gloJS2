/* eslint-disable strict */
/* eslint-disable eol-last */
/* eslint-disable max-len */
window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // timer

  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function addZero(number) {
      if (String(number).length === 1) {
        return 0 + String(number);
      } else {
        return number;
      }
    }

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = addZero(Math.floor(timeRemaining % 60)),
        minutes = addZero(Math.floor(timeRemaining / 60 % 60)),
        hours = addZero(Math.floor(timeRemaining / 3600));

      return {
        timeRemaining,
        seconds,
        minutes,
        hours
      };
    }

    function updateClock() {
      const timer = getTimeRemaining();

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }

    updateClock();
  }

  countTimer('2021-03-22');

  // menu переключает видимость меню на кнопку/элементы меню

  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItem = menu.querySelector('ul>li>a');

    let isOpen = false;

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', event => {
      const target = event.target;

      const btn = target.closest('.' + btnMenu.classList);
      const menuElem = target.closest(menu.tagName);
      const close = target.closest('.' + closeBtn.classList);
      // const li = target.closest(menuItem.tagName);


      if (isOpen) {
        if (!menuElem) {
          console.log(isOpen);
          handlerMenu();
          isOpen = false;
          return;
        }
      };

      if (close || target === menuItem) {
        handlerMenu();
        isOpen = false;
        return;
      }

      if (btn) {
        handlerMenu();
        isOpen = !isOpen;
        return;
      }


    });
  };

  toggleMenu();

  // popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');

    let counter = 0;

    function appearAnimation() {
      const popupWindow = this.querySelector('div');

      this.style.display = 'block';
      popupWindow.style.transform = 'scale(0)';

      if (document.documentElement.clientWidth >= 768) {

        counter += 5;
        popupWindow.style.transform = `scale(${counter/100})`;

        if (counter < 100) {
          setTimeout(appearAnimation.bind(this), 1);
        }

      } else {

        popupWindow.style.transform = 'scale(1)';

      }
    }

    function disappearAnimation() {
      popup.style.display = 'none';
      counter = 0;
    }

    popupBtn.forEach(element => {
      element.addEventListener('click', appearAnimation.bind(popup));
    });

    popup.addEventListener('click', event => {
      if (event.target === popup || event.target === popUpClose) {
        disappearAnimation();
      }
    });

  };

  togglePopUp();

  //tubs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {

      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', event => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });

  };

  tabs();

  // slider

  const slider = () => {
    const
      dot = [],
      dotsWrapper = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content'),
      slide = slider.querySelectorAll('.portfolio-item'),
      slidesAutoPlayTime = 3000;

    for (let i = 0; i < slide.length; i++) {
      const dotElem = document.createElement('li');
      dotElem.classList.add('dot');
      if (i === 0) {
        dotElem.classList.add('dot-active');
      }
      dot.push(dotElem);
      dotsWrapper.append(dotElem);
    }

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const slideIncrement = () => {
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
    };

    const slideDecrement = () => {
      currentSlide--;
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      slideIncrement();

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = () => {
      interval = setInterval(autoPlaySlide, slidesAutoPlayTime);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        slideIncrement();
      } else if (target.matches('#arrow-left')) {
        slideDecrement();
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide();
  };

  slider();

  // подмена картинок при наведении

  const changeImage = () => {
    const imgs = document.querySelectorAll('.command__photo');

    const toggleImage = event => {
      const src = event.target.src;
      event.target.src = event.target.dataset.img;
      event.target.dataset.img = src;
    };

    imgs.forEach(item => {
      item.addEventListener('mouseover', toggleImage);
      item.addEventListener('mouseout', toggleImage);
    });
  };

  changeImage();

  // валидация инпутов

  const validation = () => {

    let onFocus = false;

    const checkBlur = event => {
      event.target.value = event.target.value.replace(/-+(?=-+)| +(?= +)|-+(?= +)| +(?=-+)|^ +| +$|^-+|-+$/ig, '');
      if (event.target.name === 'user_name' && event.target.value) {
        event.target.value = event.target.value.split(' ').map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(' ');
      }
      event.target.removeEventListener('blur', checkBlur);
      onFocus = !onFocus;
    };

    const checkFocus = event => {
      if (!onFocus) {
        event.target.addEventListener('blur', checkBlur);
        onFocus = !onFocus;
      }
    };

    const checkInputNumber = event => {
      event.target.value = event.target.value.replace(/\D/ig, '');
      checkFocus(event);
    };

    const checkInputText = event => {
      event.target.value = event.target.value.replace(/[^а-я- ]|-(?=-)| (?= )/ig, '');
      checkFocus(event);
    };

    const checkInputEmail = event => {
      event.target.value = event.target.value.replace(/[^a-z@_.!~*'-]/ig, '');
      checkFocus(event);
    };

    const checkInputTel = event => {
      event.target.value = event.target.value.replace(/[^\d-()+ ]/ig, '');
      checkFocus(event);
    };

    document.addEventListener('input', event => {
      if (event.target.matches('input.calc-item')) {
        checkInputNumber(event);
      } else if (event.target.type === 'email') {
        checkInputEmail(event);
      } else if (event.target.type === 'tel') {
        checkInputTel(event);
      } else if (event.target.type === 'text' || event.target.matches('input')) {
        checkInputText(event);
      }
    });

  };

  validation();

  // Калькулятор

  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcCount = document.querySelector('.calc-count'),
      calcDay = document.querySelector('.calc-day'),
      totalValue = document.getElementById('total');
    let total = 0;

    const enumerationAnimation = (from, to) => {
      let counter = from;
      const step = Math.abs(Math.max(from, to) - Math.min(from, to)) / 25;

      const enumeration = () => {
        if (from < to) {
          counter += step;

          totalValue.textContent = Math.floor(counter);

          if (counter < to) {
            window.requestAnimationFrame(enumeration);
          }
        } else if (from > to) {
          counter -= step;

          totalValue.textContent = Math.floor(counter);

          if (counter > to) {
            window.requestAnimationFrame(enumeration);
          }
        }

      };

      window.requestAnimationFrame(enumeration);
    };

    const countSum = () => {
      let newTotal = total,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.value,
        squareValue = calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        newTotal = price * typeValue * squareValue * countValue * dayValue;
      }

      enumerationAnimation(total, newTotal);

      total = newTotal;
    };

    calcBlock.addEventListener('input', countSum);
  };

  calc();
  //Плавная прокрутка

  const scroll = () => {

    let counter = document.documentElement.scrollTop;

    const smoothScroll = (scrollTo) => {
      const positionY = document.querySelector(scrollTo).offsetTop;
      counter = document.documentElement.scrollTop;

      counter += 10;
      document.documentElement.scrollTop = counter;

      if (counter < positionY) {
        setTimeout(smoothScroll, 1, scrollTo);
      }
    };

    document.addEventListener('click', (event) => {
      let link = event.target.closest('a');
      if (link) {
        link = link.getAttribute('href');
      }
      if (link) {
        if (link[0] === '#' &&
          link !== '#close') {

          event.preventDefault();
          smoothScroll(link);

        }
      }
    });

  };

  scroll();

  // отпарвка на сервер

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMesage = 'Спасибо! Мы скоро с вами свяжемся';

    const forms = [...document.querySelectorAll('form')];

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

    const statusMessage = document.createElement('div');



    const postData = ((body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    });

    forms.forEach(form => {
      form.addEventListener('submit', event => {
        const elementsForm = [...form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
        elementsForm.forEach(item => item.value = '');
        const submitBtn = [...form.querySelectorAll('button')].reduce((accumulator, currentValue) => {
          if (currentValue.type === 'submit') {
            return currentValue;
          }
        });
        submitBtn.setAttribute('disabled', '');

        event.preventDefault();

        statusMessage.classList.add('sk-wave');
        statusMessage.innerHTML = `
        <div class='sk-rect sk-rect-2'></div> 
        <div class='sk-rect sk-rect-3'></div> 
        <div class='sk-rect sk-rect-4'></div> 
        <div class='sk-rect sk-rect-1'></div> 
        <div class='sk-rect sk-rect-5'></div>
        `;
        form.insertAdjacentElement('beforeend', statusMessage);

        // statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        const body = {};
        formData.forEach((val, key) => {
          body[key] = val;
        });
        postData(body, () => {
            statusMessage.textContent = successMesage;
            statusMessage.style.color = 'white';
            statusMessage.classList.remove('sk-wave');
            // statusMessage.remove();
          },
          error => {
            statusMessage.textContent = errorMessage;
            console.error(error);
          }
        );
      });
    });

  };

  sendForm();

});