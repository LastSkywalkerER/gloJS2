const scroll = () => {

  let counter = document.documentElement.scrollTop;

  const smoothScroll = scrollTo => {
    const positionY = document.querySelector(scrollTo).offsetTop;
    counter = document.documentElement.scrollTop;

    counter += 10;
    document.documentElement.scrollTop = counter;

    if (counter < positionY) {
      setTimeout(smoothScroll, 1, scrollTo);
    }
  };

  document.addEventListener('click', event => {
    let link = event.target.closest('a');
    if (link) {
      link = link.getAttribute('href');
      if (link[0] === '#' &&
        link !== '#close' && link.length > 1) {

        event.preventDefault();
        smoothScroll(link);

      }
    }

  });

};

export default scroll;