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

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      },
      searchCloseElement = event => {
        const target = event.target;
        if (target === closeBtn || target.closest(menuItems.classList) || target !== menu) {
          handlerMenu();
          menu.removeEventListener('click', searchCloseElement);
        }
      };

    btnMenu.addEventListener('click', () => {
      menu.addEventListener('click', searchCloseElement);
      handlerMenu();
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
        popupWindow.style.transform = `scale(${counter / 100})`;

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
      if (event.target.name === 'user_name') {
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
      event.target.value = event.target.value.replace(/[^\d()-]/ig, '');
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

    const countSum = () => {
      let total = 0,
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
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = Math.floor(total);
    };

    calcBlock.addEventListener('input', countSum);
  };

  calc();

});