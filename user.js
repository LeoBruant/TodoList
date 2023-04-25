class User {
    constructor(firstname,lastname,email,password,birthday){
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.birthday = birthday
    }
    
    isValidPassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/;
        return regex.test(password)
    }

    isValidEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    calculerAge(birthday) {
        const dateNaissance = new Date(birthday);
        const dateActuelle = new Date();
        const differenceMs = dateActuelle - dateNaissance;
        const age = Math.floor(differenceMs / 31536000000);
        return age;
    }

    isValid(User){
        if(User.firstname != null 
            && User.lastname != null 
            && User.isValidPassword(User.password) == true
            && User.isValidEmail(User.password) == true
            && age >= 13)
            return true
        return false
    }
}