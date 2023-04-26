import { describe, expect, it } from 'vitest'
import { User } from '../../entity/user'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 14)

// Set base user
const user = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')
const userWrongPassword = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'graegargahgreat')
const userNull = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', null)

/**
 * Valid tests
 */

describe('Password', () => {
  it('success', () => {
    expect(user.isValidPassword()).toBe(true)
  })
})

/**
 * Not valid tests
 */

// Email
describe('Email False', () => {
  it('Incorrect format', () => {
    expect(userWrongPassword.isValidPassword()).toBe(false)
  })

  it('Cannot be null', () => {
    expect(userNull.isValidPassword()).toBe(false)
  })
})
