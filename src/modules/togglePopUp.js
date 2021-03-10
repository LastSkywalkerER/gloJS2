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

export default togglePopUp;