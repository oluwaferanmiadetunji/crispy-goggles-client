import dayjs from "dayjs"

export const formatDate = (date: any, format = "MMM DD, YYYY") =>
  dayjs(date).format(format)

export const getLink = (allLinks: string[], linkType: string) => {
  try {
    return allLinks.find((oneLink) => oneLink.includes(linkType))
  } catch (err) {
    return ""
  }
}

export const formatThousands = (value: any) =>
  Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)

export const shortenString = (name: string, length = 40) => {
  if (name && name.length > length) {
    return `${name.slice(0, length)}...`
  }

  return name
}
