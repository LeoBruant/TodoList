import { describe, expect, it } from 'vitest'
import { User } from '../../entity/user'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 14)

// Set base user
let user

const reset = () => {
  user = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')
}

/**
 * Valid tests
 */

it('success', () => {
  reset()

  expect(user.isValid()).toBe(true)
})

/**
 * Not valid tests
 */

// Birthdate
describe('Birthdate', () => {
  reset()

  it('Age under 13', () => {
    user.birthdate = new Date()

    expect(user.isValid()).toBe(false)
  })
})

// Email
describe('Email', () => {
  reset()

  it('Incorrect format', () => {
    user.email = 'johndoe@gmail'

    expect(user.isValid()).toBe(false)
  })
})

// Firstname
describe('Firstname', () => {
  reset()

  it('Empty', () => {
    user.firstname = ''

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('Null', () => {
    user.firstname = null

    expect(user.isValid()).toBe(false)
  })
})

// Lastname
describe('Lastname', () => {
  reset()

  it('Empty', () => {
    user.lastname = ''

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('Null', () => {
    user.lastname = null

    expect(user.isValid()).toBe(false)
  })
})

// Password
describe('Password', () => {
  reset()

  it('Too short', () => {
    user.password = 'aA1'

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('Too long', () => {
    user.password = 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1'

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('No uppercase', () => {
    user.password = 'password1'

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('No lowercase', () => {
    user.password = 'PASSWORD1'

    expect(user.isValid()).toBe(false)
  })

  reset()

  it('No number', () => {
    user.password = 'Password'

    expect(user.isValid()).toBe(false)
  })
})
