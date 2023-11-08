export const transformDate = (date) => {
  const mounthNumber = date.getMonth();

  const getEngMounth = (mounthNumber) => {
    switch (mounthNumber) {
      case 1:
        return "january";
      case 2:
        return "february";
      case 3:
        return "march";
      case 4:
        return "april";
      case 5:
        return "may";
      case 6:
        return "june";
      case 7:
        return "july";
      case 8:
        return "august";
      case 9:
        return "september";
      case 10:
        return "october";
      case 11:
        return "november";
      case 12:
        return "december";
      default:
        return "month";
    }
  };

  return `${date.getDate()} ${getEngMounth(
    mounthNumber
  )} ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`;
};
