const FormatDate = (data) => {
  const date = new Date(data);
  const day = date.getDay();

  let stringDay = "";

  switch (day) {
    case 0:
      stringDay = "Chủ nhật";
      break;
    case 1:
      stringDay = "Thứ hai";
      break;
    case 2:
      stringDay = "Thứ ba";
      break;
    case 3:
      stringDay = "Thứ tư";
      break;
    case 4:
      stringDay = "Thứ năm";
      break;
    case 5:
      stringDay = "Thứ sáu";
      break;
    case 6:
      stringDay = "Thứ bảy";
      break;
    default:
      stringDay = "";
  }

  return `${stringDay}, ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
};

export default FormatDate;
