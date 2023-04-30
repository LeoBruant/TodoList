import { beforeEach, describe, expect, it } from 'vitest'
import { User } from '../../entity/user'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 14)

// Set base user
let user

// Run before each tests
beforeEach(() => {
  user = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')
})

/**
 * Valid tests
 */

it('success', () => {
  expect(user.isValid()).toBe(true)
})

/**
 * Not valid tests
 */

// Birthdate
describe('Birthdate', () => {
  it('Age under 13', () => {
    user.birthdate = new Date()

    expect(user.isValid()).toBe(false)
  })

  it('Empty', () => {
    user.birthdate = null

    expect(user.isValid()).toBe(false)
  })

  it('Null', () => {
    user.birthdate = null

    expect(user.isValid()).toBe(false)
  })
})

// Email
describe('Email', () => {
  it('Incorrect format', () => {
    user.email = 'johndoe@gmail'

    expect(user.isValid()).toBe(false)
  })

  it('Not an email', () => {
    user.email = 'johndoe'

    expect(user.isValid()).toBe(false)
  })

  it('Empty', () => {
    user.email = ''

    expect(user.isValid()).toBe(false)
  })

  it('Null', () => {
    user.email = null

    expect(user.isValid()).toBe(false)
  })
})

// Firstname
describe('Firstname', () => {
  it('Empty', () => {
    user.firstname = ''

    expect(user.isValid()).toBe(false)
  })

  it('Null', () => {
    user.firstname = null

    expect(user.isValid()).toBe(false)
  })
})

// Lastname
describe('Lastname', () => {
  it('Empty', () => {
    user.lastname = ''

    expect(user.isValid()).toBe(false)
  })

  it('Null', () => {
    user.lastname = null

    expect(user.isValid()).toBe(false)
  })
})

// Password
describe('Password', () => {
  it('Too short', () => {
    user.password = 'aA1'

    expect(user.isValid()).toBe(false)
  })

  it('Too long', () => {
    user.password = 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1'

    expect(user.isValid()).toBe(false)
  })

  it('No uppercase', () => {
    user.password = 'password1'

    expect(user.isValid()).toBe(false)
  })

  it('No lowercase', () => {
    user.password = 'PASSWORD1'

    expect(user.isValid()).toBe(false)
  })

  it('No number', () => {
    user.password = 'Password'

    expect(user.isValid()).toBe(false)
  })

  it('Empty', () => {
    user.password = ''

    expect(user.isValid()).toBe(false)
  })

  it('Null', () => {
    user.password = null

    expect(user.isValid()).toBe(false)
  })
})
