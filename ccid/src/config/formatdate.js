import dayjs from "dayjs";

export const formatDay = (date) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};