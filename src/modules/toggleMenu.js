const toggleMenu = () => {
  const btnMenu = document.querySelector('.menu'),
    menu = document.querySelector('menu'),
    closeBtn = document.querySelector('.close-btn'),
    menuItem = [...menu.querySelectorAll('ul>li>a')];

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

    if (close || menuItem.some(elem => elem === target)) {
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

export default toggleMenu;