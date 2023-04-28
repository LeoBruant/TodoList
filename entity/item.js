export class Item {
  constructor(content, date, name){
      this.content = content
      this.date = date
      this.name = name
  }

  isValid(todoList){
    return (
      todoList.length < 10
      &&
      this.content.length <= 1000
      &&
      (
        !todoList.length ||
        todoList.length &&
        this.name !== todoList[todoList.length - 1].name
      )
      &&
      (
        !todoList.length ||
        todoList.length &&
        Date.parse(this.date) >= Date.parse(todoList[todoList.length - 1].date) + 30 * 60 * 1000
      )
    )
  }
}
