export const filter_object = (obj:any, predicate:Function) => {
    return Object.keys(obj)
        .filter((key:string) => predicate(obj[key]) )
        .reduce((res:any, key:string) => (res[key] = obj[key], res), {} );
}