import { User } from "./User";
import { Rate } from "./Rate";
import { Comment } from "./Comment";
import { Book } from "./Book";

export type Place = {
    _id : string
    title : string, 
    description : string, 
    images :string[], 
    location : string, 
    owner : User, 
    rating : Rate[],
    price : number,
    comments : Comment[],
    books : Book[],
    facilities :string[],
    businesTravel : boolean
}