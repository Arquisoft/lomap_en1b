export type Location = {
    url:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number
};

export type LocationType = 'shop' | 'bar' | 'restaurant' | 'sight' | 'monument';