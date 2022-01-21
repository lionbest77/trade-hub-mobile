
export const dateTimeToString = date => {
  if (!date) return '';
  let dateTime = new Date(date);
  const formatNum = num => (num < 10 ? `0${num}` : num);
  return (`${formatNum(dateTime.getDate())}.${formatNum(dateTime.getMonth() +
      1)}.${dateTime.getFullYear()} ${dateTime.getHours()}:${formatNum(
      dateTime.getMinutes())}`);
};