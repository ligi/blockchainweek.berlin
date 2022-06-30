import { format, utcToZonedTime, toDate, zonedTimeToUtc } from 'date-fns-tz'
import { formatISO } from 'date-fns'

const timeZone = 'Europe/Berlin'

function getBerlinDate(timestamp) {
  return utcToZonedTime(new Date(timestamp), timeZone)
}

function getUtcFromBerlinTime(timestamp) {
  return zonedTimeToUtc(timestamp, timeZone)
}

export function getTime(timestamp) {
  return format(getBerlinDate(timestamp), 'HH:mm', { timeZone })
}

export function getCalendarDate(timestamp) {
  return formatISO(getUtcFromBerlinTime(timestamp), { format: 'basic' })
}

export function getDate(timestamp) {
  return format(getBerlinDate(timestamp), 'dd-MM-yyyy', { timeZone })
}

export function getDay(timestamp) {
  return format(getBerlinDate(timestamp), 'dd', { timeZone })
}

export function getTimestampFromDateAndTime(date, time) {
  const [month, day, year] = date.split('/')
  const [hour, min] = convertTime12to24(time).split(':')
  const fullHour = hour.length === 2 ? hour : '0' + hour
  const fullDay = day.length === 2 ? day : '0' + day
  const fullMonth = month.length === 2 ? month : '0' + month
  const fullYear = year.length === 2 ? '20' + year : year
  const dateString = `${fullYear}-${fullMonth}-${fullDay}T${fullHour}:${min}:00+02:00`
  const berlinDate = toDate(dateString)

  return berlinDate.getTime()
}

export function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ')
  // eslint-disable-next-line
  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours}:${minutes}`
}
