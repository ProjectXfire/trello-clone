const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formattingDate = (date: Date) => {
  const setDate = new Date(date);
  const day = setDate.getUTCDate();
  const fullYear = setDate.getFullYear();
  const month = months[setDate.getMonth()];
  let hours = setDate.getHours();
  const minutes = setDate.getMinutes();
  let period = 'AM';
  if (hours > 12) {
    period = 'PM';
    hours = hours - 12;
  }
  return `${month} ${day}, ${fullYear} at ${hours.toString().padStart(2, '0')}:${minutes
    .toPrecision()
    .padStart(2, '0')} ${period}`;
};
