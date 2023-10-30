import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatToStringDateTimezone(
  timestamp: number | string | Date | any
): string {
  const formattedTime = dayjs(timestamp)
    .tz('UTC')
    .format('YYYY-MM-DD HH:mm:ss.SSSSSS Z');

  return formattedTime;
}
