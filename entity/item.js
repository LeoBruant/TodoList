class Item {
    constructor(name,content,date){
        this.name = name
        this.content = content
        this.date = date
    }
        
    isValid(todoLists){
        return (
            (this.content.length <= 1000) ||
            (
              todoLists.length &&
              todoLists[0].length &&
              Date.parse(Date.now()) < Date.parse(todoLists[0][todoLists[0].length - 1].date) + 30 * 60 * 1000
            )
          )
    }
}