import dayjs from 'dayjs';

export const isExpired = (expiredDate: any) => dayjs().isAfter(dayjs(expiredDate));