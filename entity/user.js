import { send } from "./emailSenderService"

export class User {
  constructor(birthdate, email, firstname, lastname, password){
    this.birthdate = birthdate
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.password = password
    this.todoLists = [[]]
  }

  add(item) {
    if (!item.isValid(this.todoLists[this.todoLists.length - 1])) {
      return 422
    }

    this.todoLists[this.todoLists.length - 1].push(item)

    if(this.todoLists[this.todoLists.length - 1].length === 8) {
      return send()
    }

    return 201
  }

  isValid(){
    return (
      !!this.firstname
      && !!this.lastname
      && this.isValidPassword()
      && this.isValidEmail()
      && this.isValidAge()
    )
  }

  isValidAge() {
    if (!this.birthdate || this.birthdate > new Date()) {
      return false
    }

    const age = (new Date() - this.birthdate) / 1000 / 60 / 60 / 24 / 365.2425

    return age >= 13
  }

  isValidEmail(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(this.email)
  }

  isValidPassword() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/

    return regex.test(this.password)
  }
}
