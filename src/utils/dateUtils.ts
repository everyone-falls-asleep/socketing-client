import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatToKoreanDateAndTime = (dateString: string) => {
  return dayjs(dateString)
    .tz("Asia/Seoul")
    .format("YYYY년 MM월 DD일 HH시 mm분");
};

export const formatToKoreanDate = (dateString: string) => {
  return dayjs(dateString).tz("Asia/Seoul").format("YYYY년 MM월 DD일");
};

export const formatToKoreanTime = (dateString: string) => {
  return dayjs(dateString).tz("Asia/Seoul").format("HH시 mm분");
};
