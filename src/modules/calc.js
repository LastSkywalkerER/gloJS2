const calc = (price = 100) => {

  const calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSquare = document.querySelector('.calc-square'),
    calcCount = document.querySelector('.calc-count'),
    calcDay = document.querySelector('.calc-day'),
    totalValue = document.getElementById('total');
  let total = 0;

  const enumerationAnimation = (from, to) => {
    let counter = from;
    const step = Math.abs(Math.max(from, to) - Math.min(from, to)) / 25;

    const enumeration = () => {
      if (from < to) {
        counter += step;

        totalValue.textContent = Math.floor(counter);

        if (counter < to) {
          window.requestAnimationFrame(enumeration);
        }
      } else if (from > to) {
        counter -= step;

        totalValue.textContent = Math.floor(counter);

        if (counter > to) {
          window.requestAnimationFrame(enumeration);
        }
      }

    };

    window.requestAnimationFrame(enumeration);
  };

  const countSum = () => {
    let newTotal = total,
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
      newTotal = price * typeValue * squareValue * countValue * dayValue;
    }

    enumerationAnimation(total, newTotal);

    total = newTotal;
  };

  calcBlock.addEventListener('input', countSum);
};

export default calc;