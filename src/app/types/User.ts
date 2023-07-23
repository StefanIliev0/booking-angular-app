import { Place } from "./Place";
import { UserBook } from "./UserBook";
import { Mesage } from "./Mesage";

export type User = {
    _id : string
    username : string ,
    password : string, 
    accessToken : string, 
    places : Place[] | [],
    books :  UserBook[] | [],
    profilePicture : string,
    about : string,
    mesages : Mesage[]
}


