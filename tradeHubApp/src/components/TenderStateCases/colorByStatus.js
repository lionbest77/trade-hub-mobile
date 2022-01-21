import COLORS from "../../constants/Colors";

const colorByStatus = status => {
  switch (status) {
    case 0:
      return COLORS.new;
    case 1:
    case 2:
    case 3:
      return COLORS.good;
    case 4:
    case 5:
      return COLORS.main;
    case 6:
      return COLORS.finished;
    default:
      break;
  }
};

export default colorByStatus;
