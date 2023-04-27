import { describe, expect, it } from 'vitest'
import { User } from '../../entity/user'
import { Item } from '../../entity/item'

// Set base birtdate
const birthdate = new Date()
birthdate.setFullYear(new Date().getFullYear() - 13)

// Set base todolist item
let todolistItem

// Set base user
let user

const reset = () => {
  todolistItem = new Item('Content', new Date('01/01/2000'), 'Item')
  user = new User(birthdate, 'johndoe@gmail.com', 'John', 'Doe', 'Password1')
}

/**
 * Status code 200
 */

it('One item', () => {
  reset()

  expect(user.add(todolistItem)).toEqual(200)
})

it('Max items', () => {
  reset()

  for (let i = 0; i < 9; i++) {
    user.todoLists[0].push(todolistItem)
  }

  expect(user.add(new Item(
    todolistItem.content,
    new Date(Date.parse(todolistItem.date) + 45 * 60 * 1000),
    'Last item'
  ))).toEqual(200)
})

/**
 * Status code 422
 */

it('Item with content too long', () => {
  reset()

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
  reset()

  user.add(todolistItem)

  expect(user.add(new Item(
    todolistItem.content,
    new Date(Date.parse(todolistItem.date) + 45 * 60 * 1000),
    todolistItem.name
  ))).toEqual(422)
})

it('Too much items', () => {
  reset()

  for (let i = 0; i < 10; i++) {
    user.todoLists[0].push(todolistItem)
  }

  expect(user.add(new Item(
    todolistItem.content,
    new Date(Date.parse(todolistItem.date) + 45 * 60 * 1000),
    'Item over limit'
  ))).toEqual(422)
})

it('Adding too fast', () => {
  reset()

  user.add(todolistItem)

  expect(user.add(new Item(todolistItem.content, todolistItem.date, 'Item added too fast'))).toEqual(422)
})
