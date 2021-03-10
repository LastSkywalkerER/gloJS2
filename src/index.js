// подключение модулей
import calc from './modules/calc';
import changeImage from './modules/changeImage';
import countTimer from './modules/countTimer';
import maskPhone from './modules/maskPhone';
import scroll from './modules/scroll';
import sendForm from './modules/sendForm';
import slider from './modules/slider';
import tabs from './modules/tabs';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import validation from './modules/validation';
import Validator from './modules/validator';

/* eslint-disable strict */
/* eslint-disable eol-last */
/* eslint-disable max-len */
window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // валидаторы для форм
  const validator1 = new Validator({
    selector: '#form1',
    method: {
      'tel': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'text': [
        ['notEmpty']
      ]
    }
  });

  validator1.init();

  const validator2 = new Validator({
    selector: '#form2',
    method: {
      'tel': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'text': [
        ['notEmpty']
      ]
    }
  });

  validator2.init();

  const validator3 = new Validator({
    selector: '#form3',
    method: {
      'tel': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'text': [
        ['notEmpty']
      ]
    }
  });

  validator3.init();


  // маска для телефонов
  maskPhone('.form-phone');

  // timer
  countTimer('2021-03-22');

  // menu переключает видимость меню на кнопку/элементы меню
  toggleMenu();

  // popup
  togglePopUp();

  //tubs
  tabs();

  // slider
  slider();

  // подмена картинок при наведении
  changeImage();

  // валидация инпутов
  validation();

  // Калькулятор
  calc();

  //Плавная прокрутка
  scroll();

  // отпарвка на сервер
  sendForm();


});