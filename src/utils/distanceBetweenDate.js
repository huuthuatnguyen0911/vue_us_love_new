const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function DistanceBetweenDate(date_1, date_2) {
  const date1 = new Date(date_1);
  const date2 = new Date(date_2);
  //   const diffTime = Math.abs(date2 - date1);
  //   const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  //   return diffDays;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
export default DistanceBetweenDate;
