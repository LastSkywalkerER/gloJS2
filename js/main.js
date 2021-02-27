window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // timer

  function countTimer(deadline) {
    const timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

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

    function addZero(number) {
      if (String(number).length === 1) {
        return 0 + String(number);
      } else {
        return number;
      }
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

  countTimer('2021-03-01');

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      },
      searchCloseElement = (event) => {
        const target = event.target;
        if (target === closeBtn || target.closest(menuItems.classList) || target !== menu) {
          handlerMenu();
          menu.removeEventListener('click', searchCloseElement);
        }
      }

    btnMenu.addEventListener('click', () => {
      menu.addEventListener('click', searchCloseElement);
      handlerMenu();
    });
    // closeBtn.addEventListener('click', handlerMenu);
    // menuItems.forEach(element => {
    //   element.addEventListener('click', handlerMenu);
  }

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

    popup.addEventListener('click', (event) => {
      if (event.target === popup || event.target === popUpClose) {
        disappearAnimation();
      }
    })

  };

  togglePopUp();

  //tubs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {

      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    }

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        })
      }
    })

  }

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
      let dotElem = document.createElement('li');
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

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

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

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide();
  };

  slider();

});