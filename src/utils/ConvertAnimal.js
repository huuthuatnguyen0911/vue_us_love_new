const convertHabitat = (habitat) => {
  let nameHabitat = "";

  switch (habitat) {
    case "land":
      nameHabitat = "Trên cạn";
      break;
    case "water":
      nameHabitat = "Dưới/trên nước";
      break;
    case "overhead":
      nameHabitat = "Trên không";
      break;
    case "swamp":
      nameHabitat = "Đầm lầy";
      break;
  }

  return nameHabitat;
};

const convertStatus = (status) => {
  let statusNew = "";

  switch (status) {
    case "protected":
      statusNew = "Được bảo vệ";
      break;
    case "extinct":
      statusNew = "Đã tuyệt chủng";
      break;
    case "normal":
      statusNew = "Bình thường";
      break;
    case "extermination":
      statusNew = "Cần tiêu diệt";
      break;
  }

  return statusNew;
};

export { convertHabitat, convertStatus };
