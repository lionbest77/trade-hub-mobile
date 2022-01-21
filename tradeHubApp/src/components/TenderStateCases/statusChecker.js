const statusChecker = status => {
  switch (status) {
    case 0:
      return "Новий. Очікує обробки";
    case 3:
      return "Вибір постачальника";
    case 1:
      return "Вимагає підтвердження";
    case 4:
      return "Документи";
    case 5:
      return "Доставка очікується";
    case 2:
      return "Підтверджений";
    case 6:
      return "Доставка успішна";
    default:
      break;
  }
};

export default statusChecker;
