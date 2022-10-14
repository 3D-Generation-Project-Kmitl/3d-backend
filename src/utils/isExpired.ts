import dayjs from 'dayjs';

export const isExpired = (expiredDate: Date | null) => dayjs().isAfter(dayjs(expiredDate));