export const edges_to_array = (object:any) => {
    return Object.keys(object).map((elem:string) => {return object[elem].node;});
}