import { dayjs } from "./dayjs";

export function format(date: Date, format: string, tz: string = "Asia/Tokyo"): string {
  return dayjs(date).tz(tz).format(format);
}
