export class User {
  constructor(birthdate, email, firstname, lastname, password){
    this.birthdate = birthdate
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.password = password
    this.todoLists = []
  }

  add(item) {
    if (
      (item.content.length > 1000) ||
      (this.todoLists.length && this.todoLists[0].length >= 10) ||
      (
        this.todoLists.length &&
        this.todoLists[0].length &&
        Date.parse(Date.now()) < Date.parse(this.todoLists[0][this.todoLists[0].length - 1].date) + 30 * 60 * 1000
      )
    ) {
      return 422
    }

    if (this.todoLists.length === 0) {
      this.todoLists.push([item])
    } else {
      this.todoLists[this.todoLists.length - 1].push(item)
    }

    return 200
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
    if (this.birthdate > new Date()) {
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
