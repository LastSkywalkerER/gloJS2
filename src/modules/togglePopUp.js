const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn'),
    popUpClose = document.querySelector('.popup-close'),
    popupForm = popup.querySelector('form'),
    popupWindow = popup.querySelector('div');

  let counter = 0;

  function appearAnimation() {

    popup.style.display = 'block';
    popupWindow.style.transform = 'scale(0)';

    if (document.documentElement.clientWidth >= 768) {

      counter += 10;
      popupWindow.style.transform = `scale(${counter / 100})`;

      if (counter <= 100) {
        requestAnimationFrame(appearAnimation);
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
    element.addEventListener('click', () => {
      requestAnimationFrame(appearAnimation);
    });
  });

  popup.addEventListener('click', event => {
    if (event.target === popup || event.target === popUpClose) {
      disappearAnimation();
    }
  });

  popupForm.addEventListener('submit', disappearAnimation);

};

export default togglePopUp;