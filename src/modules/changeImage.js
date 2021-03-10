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

export default changeImage;