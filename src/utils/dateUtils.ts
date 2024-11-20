import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToKoreanDateAndTime = (date: string | number) => {
  return dayjs(date).tz("Asia/Seoul").format("YYYY년 MM월 DD일 HH시 mm분");
};

export const formatToKoreanDate = (date: string | number) => {
  return dayjs(date).tz("Asia/Seoul").format("YYYY년 MM월 DD일");
};

export const formatToKoreanTime = (date: string | number) => {
  return dayjs(date).tz("Asia/Seoul").format("HH시 mm분");
};

export const formatDateToKoreanDateAndTime = (date: Date) => {
  return dayjs(date).tz("Asia/Seoul").format("YYYY년 MM월 DD일 HH시 mm분");
};

export const formatDateToKoreanDate = (date: Date) => {
  return dayjs(date).tz("Asia/Seoul").format("YYYY년 MM월 DD일");
};

export const formatDateToKoreanTime = (date: Date) => {
  return dayjs(date).tz("Asia/Seoul").format("HH시 mm분");
};
