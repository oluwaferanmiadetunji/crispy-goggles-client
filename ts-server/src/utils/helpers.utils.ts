import randomstring from 'randomstring'
//@ts-ignore
import durationToSeconds from 'duration-to-seconds'

export const customPassword = (value: string, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters')
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      'Password must contain at least 1 letter and 1 number',
    )
  }
  return value
}

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const transformJoiErrorMessage = (error: string): string => {
  const splitString = error.split('"')

  const formattedErrorMessage =
    capitalizeFirstLetter(splitString[1]) + splitString[2]

  return formattedErrorMessage
}

export const generateRandomString = (length = 8): string =>
  randomstring.generate(length)

export const stringToBoolean = (stringValue: string): Boolean | string => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true

    case 'false':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false

    default:
      return stringValue
  }
}

export const pickQueryParams = (object: any, keys: any) => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign

      obj[key] = stringToBoolean(object[key])
    }

    return obj
  }, {})
}

export const convertDurationToSeconds = (duration: string): number =>
  Number(durationToSeconds(`P${duration}`))
