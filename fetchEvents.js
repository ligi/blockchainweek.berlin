import Papa from 'papaparse'
import { getTimestampFromDateAndTime, convertTime12to24 } from './utils'

export function fetchEvents(fileUrl) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      transformHeader: (h) => h.trim(),
      complete(results) {
        if (results.data) {
          return resolve(
            results.data.map(normalizeEvent).filter((event) => event)
          )
        } else {
          return reject(results.errors)
        }
      },
    })
  })
}

function normalizeEvent(rawEvent) {
  if (rawEvent['Title of your event']) {
    const startTimestamp = getTimestampFromDateAndTime(
      rawEvent['start date'],
      rawEvent['start time']
    )
    const endTimestamp = getTimestampFromDateAndTime(
      rawEvent['end date'],
      rawEvent['end time']
    )

    return {
      id: `${rawEvent['Title of your event']} ${startTimestamp}`,
      eventType: rawEvent['Event type'],
      title: rawEvent['Title of your event'],
      description: rawEvent['Long description'],
      startTimestamp,
      endTimestamp,
      venue: rawEvent.Venue,
      address: rawEvent.Address,
      url: parseUrls(rawEvent['Event URL']),
      startTime: convertTime12to24(rawEvent['start time']),
      endTime: convertTime12to24(rawEvent['end time']),
      categories: rawEvent['Event type']
        .split(',')
        .map((category) => category.trim()),
    }
  } else {
    return null
  }
}

function parseUrls(url) {
  if (url.includes(',')) {
    const urls = url.split(',')

    return urls.map((link) => {
      if (link.includes('##')) {
        return {
          label: link.split('##')[0],
          link: link.split('##')[1],
        }
      } else {
        return {
          label: 'Link 1',
          link,
        }
      }
    })
  } else {
    return url
  }
}
