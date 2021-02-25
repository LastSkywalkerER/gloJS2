const date = new Date(),
  nextYear = new Date(date.getFullYear() + 1, 0, 1),
  day = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

switch (date.getHours()) {
  case (1):
  case (2):
  case (3):
  case (4):
  case (5):
  case (6):
    document.writeln('Доброй ночи');
    break;
  case (7):
  case (8):
  case (9):
  case (10):
  case (11):
  case (12):
    document.writeln('Доброе утро');
    break;
  case (13):
  case (14):
  case (15):
  case (16):
  case (17):
  case (18):
    document.writeln('Добрый день');
    break;
  case (19):
  case (20):
  case (21):
  case (22):
  case (23):
  case (24):
    document.writeln('Добрый вечер');
    break;
}

document.writeln(`<br>`);

document.writeln(`Сегодня: ${day[date.getDay()]}`);

document.writeln(`<br>`);

document.writeln(`текущее время ${date.toLocaleString('en').split(', ')[1]}`);

document.writeln(`<br>`);

document.writeln(`До нового года осталось ${Math.floor((nextYear.getTime() - date.getTime()) / 1000 / 3600 / 24)} дней`);