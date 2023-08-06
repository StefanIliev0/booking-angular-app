import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { User } from "../types/User";
import { UserBook } from "../types/UserBook";
import { Mesage } from "../types/Mesage";


export const UsersActions = createActionGroup({
    source: 'Users',
    events : {
        "add" : props<{ user: User }>(),
        "remove" : emptyProps() ,
        "addBook" :   props<{ userBook: UserBook }>(),
        "addPlace" :   props<{ PlaceId: string }>(),
        "removePlace" : props<{ PlaceId: string }>(),
        "updateUser" : props<{userInfo : {nickname : string , about : string , profilePicture : string}}>(),
        "addConv" : props<{message : Mesage}>(),
        "addMessage" : props<{message : string , messageId : string ,userId : string}>(),
        "updateUserData" : props<{mesages : Mesage[] , books  :UserBook[]}>(),
        },
    });