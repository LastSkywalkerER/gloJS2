class CarouselSlider {
  constructor({
    main,
    wrap,
    next,
    prev,
    infinity = false,
    position = 0,
    slidesToShow = 3,
    responsive = [{
        breackpoint: 1024,
        slidesToShow: 3
      },
      {
        breackpoint: 768,
        slidesToShow: 2
      },
      {
        breackpoint: 576,
        slidesToShow: 1
      }
    ],
  }) {
    try {
      this.main = document.querySelector(main);
      this.wrap = document.querySelector(wrap);
      this.slides = [...document.querySelector(wrap).children];
    } catch {
      console.warn('CarouselSlider: optins "main" and "wrap" are required!');
      this.init = () => {};
      return;
    }
    this.next = document.querySelector(next);
    this.prev = document.querySelector(prev);
    this.slidesToShow = slidesToShow;
    this.options = {
      position,
      infinity,
      widthSlide: Math.floor(100 / this.slidesToShow),
      maxPosition: this.slides.length - this.slidesToShow,
    };
    this.responsive = responsive;
  }

  init() {
    this.addGloClass();
    this.addStyle();

    if (this.responsive) {
      this.responseInit();
    }

    if (this.options.infinity) {
      this.addMoreSlides();
    }

    if (this.prev && this.next) {
      this.controlSlider();
    } else {
      this.addArrow();
      this.controlSlider();
    }

  }

  addMoreSlides() {
    this.clonedSlides = [];
    this.clonedSlides.push(this.slides.map(element => element.cloneNode(true)));
    this.clonedSlides.push(this.slides);
    this.clonedSlides.push(this.slides.map(element => element.cloneNode(true)));

    this.rerenderSlides();
  }

  rerenderSlides() {
    this.options.position += this.slides.length;
    this.moveSlides();

    this.clonedSlides.forEach(slides => slides.forEach(slide => this.wrap.append(slide)));

  }

  addGloClass() {
    this.main.classList.add('glo-slider');
    this.wrap.classList.add('glo-slider__wrap');
    for (const item of this.slides) {
      item.classList.add('glo-slider__item');
    }
  }

  addStyle() {
    this.style = document.getElementById('sliderCarousel-style');
    if (!this.style) {
      this.style = document.createElement('style');
      this.style.id = 'sliderCarousel-style';
    }

    this.style.textContent = `
    .glo-slider {
      overflow: hidden !important;
      position: relative;
    }
    .glo-slider__wrap {
      display: flex !important;
      transition: transform 0.5s !important;
      will-change: transform !important;
      margin: 0 !important;
    }

    .glo-slider__item {
      flex: 0 0 ${this.options.widthSlide}% !important;
      margin: auto 0 !important;
    }
    `;

    document.head.append(this.style);
  }

  disableAnimation() {
    this.style.textContent = `
    .glo-slider {
      overflow: hidden !important;
      position: relative;
    }
    .glo-slider__wrap {
      display: flex !important;
      margin: 0 !important;
    }

    .glo-slider__item {
      flex: 0 0 ${this.options.widthSlide}% !important;
      margin: auto 0 !important;
    }
    `;

    document.head.append(this.style);
  }

  controlSlider() {
    this.prev.addEventListener('click', this.prevSlider.bind(this));
    this.next.addEventListener('click', this.nextSlider.bind(this));

    document.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        this.nextSlider();
      }
      if (event.key === 'ArrowLeft') {
        this.prevSlider();
      }
    });
  }

  moveSlides() {
    this.wrap.style.transform = `translateX(${-this.options.position * this.options.widthSlide}%)`;
  }

  prevSlider() {
    if (this.options.infinity && this.options.position < this.slides.length / 2) {
      this.disableAnimation();
      this.options.position += this.slides.length;
      this.moveSlides();
    }
    if (this.options.infinity || this.options.position > 0) {
      setTimeout(() => {
        this.addStyle();
        --this.options.position;
        this.moveSlides();
      }, 5);
    }

  }

  nextSlider() {
    if (this.options.infinity && this.options.position > this.slides.length * 2.5 - 1) {
      this.disableAnimation();
      this.options.position -= this.slides.length;
      this.moveSlides();
    }
    if (this.options.infinity || this.options.position < this.options.maxPosition) {
      setTimeout(() => {
        this.addStyle();
        ++this.options.position;
        this.moveSlides();
      }, 5);
    }

  }

  addArrow() {
    this.prev = document.createElement('button');
    this.next = document.createElement('button');

    this.prev.className = 'glo-slider__prev';
    this.next.className = 'glo-slider__next';

    this.main.append(this.prev);
    this.main.append(this.next);

    const style = document.createElement('style');
    style.textContent = `
      .glo-slider__prev,
      .glo-slider__next {
        margin: 0 10px;
        border: 20px solid transparent;
        background: transparent;
        position: absolute;
        top: 50%;
        transform: translateY(50%);
      }

      .glo-slider__next {
        border-left-color: #19b5fe;
        right: 0;
        transform: translateX(50%);
      }

      .glo-slider__prev {
        border-right-color: #19b5fe;
        left: 0;
        transform: translateX(-50%);
      }

      .glo-slider__prev:hover,
      .glo-slider__next:hover, 
      .glo-slider__prev:focus,
      .glo-slider__next:focus {
        background: transparent;
        outline: none;
      }
    `;

    document.head.append(style);
  }

  updateOptions() {
    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
    this.addStyle();
  }

  responseInit() {
    const slidesToShowDefault = this.slidesToShow,
      allResponse = this.responsive.map(item => item.breackpoint),
      maxResponse = Math.max(...allResponse);

    const checkResponse = () => {
      const widthWindow = document.documentElement.clientWidth;
      if (widthWindow < maxResponse) {
        for (let i = 0; i < allResponse.length; i++) {
          if (widthWindow < allResponse[i]) {
            this.slidesToShow = this.responsive[i].slidesToShow;
            this.updateOptions();
          }
        }
      } else {
        this.slidesToShow = slidesToShowDefault;
        this.updateOptions();
      }
    };

    checkResponse();

    window.addEventListener('resize', checkResponse);
  }
};

export default CarouselSlider;