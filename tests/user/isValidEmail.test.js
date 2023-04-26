import { describe, expect, it } from 'vitest'
import { User } from '../../entity/user'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 14)

// Set base user
const userTrueEmail = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')
const userFalseEmail = new User(birthdate, 'gragragarg', 'Fail', 'False', 'Password1')
const userNullEmail = new User(birthdate, null, 'Nul', 'None', 'Password1')
const userNoASCII = new User(birthdate, 'test@résumé.com', 'Fail', 'False', 'Password1')

/**
 * Valid tests
 */

describe('Email', () => {
  it('success', () => {
    expect(userTrueEmail.isValidEmail()).toBe(true)
  })
    
  it('Success ASCII', () => {
    expect(userNoASCII.isValidEmail()).toBe(true)
  })
})

/**
 * Not valid tests
 */

// Email
describe('Email False', () => {
  it('Incorrect format', () => {
    expect(userFalseEmail.isValidEmail()).toBe(false)
  })

  it('Cannot be null', () => {
    expect(userNullEmail.isValidEmail()).toBe(false)
  })
})
