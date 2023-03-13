
//This file includes all the custom types we will need for the app
//NOTE: These are just temporal so that the code compiles and works
//      in a correct way. But we will need to see the pod standards
//      to keep it consistent

export type MapMarker = {
    lat : number;
    lng : number;
    name: string;
    category: string;
    id : string;
    details: string;
}


export type Friend = {
    username : string;
    podId : string;
}