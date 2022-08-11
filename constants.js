export const SUBMIT_EVENT_URL =
  process.env.SUBMIT_EVENT_URL ||
  'https://forms.gle/w2kaQcspJhbx9qPh9'
export const EVENTS_URL =
  process.env.EVENTS_URL ||
  'https://raw.githubusercontent.com/joergkiesewetter/blockchainweek.berlin/main/events.csv'

export const DEFAULT_BACKGROUND_IMAGE = process.env.DEFAULT_BACKGROUND_IMAGE

export const languages = [
  {
    name: 'English',
    code: 'en',
    iso: 'en-US',
    isCatchallLocale: true,
  },
  {
    name: 'Português',
    code: 'pt',
    iso: 'pt-PT',
  },
]

export const EVENT_CATEGORIES = [
  { label: 'all' },
  { label: 'favorites' },
  { label: 'conference'},
  { label: 'event/meetup' },
  { label: 'hackathon' },
  { label: 'workshop' },
  { label: 'drinks/party' },
  { label: 'other' },
]

export const WEEK = {
  11: {
    key: '11',
    timestamp: 1662854400000,
    name: 'SUN',
  },
  12: {
    key: '12',
    timestamp: 1662940800000,
    name: 'MON',
  },
  13: {
    key: '13',
    timestamp: 1663027200000,
    name: 'TUE',
  },
  14: {
    key: '14',
    timestamp: 1663113600000,
    name: 'WED',
  },
  15: {
    key: '15',
    timestamp: 1663200000000,
    name: 'THU',
  },
  16: {
    key: '16',
    timestamp: 1663286400000,
    name: 'FRI',
  },
  17: {
    key: '17',
    timestamp: 1663372800000,
    name: 'SAT',
  },
  18: {
    key: '18',
    timestamp: 1663459200000,
    name: 'SUN',
  }
}
