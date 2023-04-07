import dayjs from "dayjs"

export const formatDate = (date: any, format = "MMM DD, YYYY") => dayjs(date).format(format)
