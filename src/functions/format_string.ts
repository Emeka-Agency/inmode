export const format_string = function (str:string, has_to_be_lower:boolean = false, italic:boolean = false) {
    return str.replace('#', '').replace('|', '').replace('//', '');
}