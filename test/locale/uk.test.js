import moment from 'moment'
import MockDate from 'mockdate'
import dayjs from '../../src'
import relativeTime from '../../src/plugin/relativeTime'
import '../../src/locale/uk'

dayjs.extend(relativeTime)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('RelativeTime: Time from X', () => {
  const T = [
    [44.4, 'second'], // a few seconds
    [89.5, 'second'], // a minute
    [43, 'minute'], // 44 minutes
    [21, 'hour'], // 21 hours
    [25, 'day'], // 25 days
    [10, 'month'], // 2 month
    [18, 'month'] // 2 years
  ]

  T.forEach((t) => {
    dayjs.locale('uk')
    moment.locale('uk')
    expect(dayjs().from(dayjs().add(t[0], t[1])))
      .toBe(moment().from(moment().add(t[0], t[1])))
    expect(dayjs().from(dayjs().add(t[0], t[1]), true))
      .toBe(moment().from(moment().add(t[0], t[1]), true))
  })
})

it('hour', () => {
  const str0 = '2020-03-18 19:15:00'
  const str = '2020-03-18 20:15:00'
  const result = dayjs(str0).locale('uk').to(str)

  expect(result).toEqual(moment(str0).locale('uk').to(str))
  const result2 = dayjs(str).locale('uk').to(str0, true)
  expect(result2).toEqual('година') // different from moment.js
})
