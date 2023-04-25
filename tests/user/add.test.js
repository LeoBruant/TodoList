import { describe, expect, it } from 'vitest'
import { User } from '../../entity/user'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 13)

// Set base todolist item
const todolistItem = {
  name: 'Item',
  content: 'Content',
  date: new Date()
}

// Set base user
const user = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')

/**
 * Status code 200
 */

it('One item', () => {
  expect(user.add(todolistItem)).toEqual(200)
})

it('Max items', () => {
  for (let i = 0; i < 9; i++) {
    todolistItem.name = `Item ${i}`

  }

  expect(user.add(todolistItem)).toEqual(200)
})

/**
 * Status code 422
 */

it('Item with content too long', () => {
  todolistItem.content = `
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    a
  `

  expect(user.add(todolistItem)).toEqual(422)
})

it('2 items with same name', () => {
  user.add(todolistItem)
  expect(user.add(todolistItem)).toEqual(422)
})

it('Too much items', () => {
  for (let i = 0; i < 10; i++) {
    todolistItem.name = `Item ${i}`
    user.add(todolistItem)
  }

  expect(user.add(todolistItem)).toEqual(422)
})

it('Adding to fast', () => {
  user.add(todolistItem)

  todolistItem.date.setMinutes(todolistItem.date.getMinutes() + 10)

  expect(user.add(todolistItem)).toEqual(422)
})
