const randomString = function(length:number = 10, letters:boolean = true, numbers:boolean = true):string
{
    let characters = "";
    if(letters == true) {
        characters += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if(numbers == true) {
        characters += "0123456789"
    }
    return Array(length).fill(0).map(() => characters[(Math.random() * (characters.length - 1)).toFixed(0)]).join('');
}

export default randomString;