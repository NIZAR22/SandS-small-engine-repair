import { formatPhone, formatPhoneInput, formatTime, formatHours, splitEmail } from '@/utils/format'

describe('formatPhone', () => {
  it('formats 10 digits for display', () => {
    expect(formatPhone('3213451480')).toBe('(321) 345-1480')
  })

  it('returns anything that is not 10 digits unchanged', () => {
    expect(formatPhone('12345')).toBe('12345')
  })
})

describe('formatPhoneInput', () => {
  it.each([
    ['3', '(3'],
    ['321', '(321) '],
    ['3213', '(321) 3'],
    ['321345', '(321) 345-'],
    ['3213451480', '(321) 345-1480'],
    ['(321) 345-1480', '(321) 345-1480'],
    ['32134514809', '(321) 345-1480']
  ])('formats %s as %s', (input, expected) => {
    expect(formatPhoneInput(input)).toBe(expected)
  })

  it('leaves input without digits unchanged', () => {
    expect(formatPhoneInput('abc')).toBe('abc')
    expect(formatPhoneInput('')).toBe('')
  })
})

describe('splitEmail', () => {
  it('splits before the @', () => {
    expect(splitEmail('name@example.com')).toEqual(['name', '@example.com'])
  })

  it('keeps a value without @ in one piece', () => {
    expect(splitEmail('not-an-email')).toEqual(['not-an-email', ''])
  })
})

describe('formatTime', () => {
  it.each([
    ['08:00', '8:00 AM'],
    ['00:15', '12:15 AM'],
    ['12:30', '12:30 PM'],
    ['18:00', '6:00 PM']
  ])('converts %s to %s', (input, expected) => {
    expect(formatTime(input)).toBe(expected)
  })
})

describe('formatHours', () => {
  it('formats an opening-hours range', () => {
    expect(formatHours({ open: '08:00', close: '18:00' })).toBe('8:00 AM - 6:00 PM')
  })
})
