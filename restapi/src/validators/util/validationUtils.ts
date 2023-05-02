export function isEmpty(str:string|null|undefined) {
    return (!str || str.trim().length === 0 );
}