export type Location = {
    url:string,
    name:string,
    locationType:LocationType,
    latitude:number,
    longitude:number
};

export enum LocationType {shop='shop', bar= 'bar', restaurant='restaurant', sight='sight' ,monument='monument'}