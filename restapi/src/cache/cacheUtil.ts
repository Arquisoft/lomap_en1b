import {Review} from "../types";
import {add} from "../repo/repository"

export function cacheLocation(location:Location){
    add(location);
}

export function cacheReview(_review:Review){

}