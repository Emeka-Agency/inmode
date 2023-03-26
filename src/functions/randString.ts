const randomString = function(length:number = 10, letters:boolean = true, numbers:boolean = true):string
{
    let characters:string = "";
    if(letters == true) {
        characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if(numbers == true) {
        characters += "0123456789"
    }
    return Array(length).fill(0).map(():string => characters[Math.trunc(Math.random() * (characters.length - 1))]).join('');
}

export default randomString;