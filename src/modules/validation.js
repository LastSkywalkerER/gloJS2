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

export default validation;