import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { User } from "../types/User";
import { UserBook } from "../types/UserBook";


export const UsersActions = createActionGroup({
    source: 'Users',
    events : {
        "add" : props<{ user: User }>(),
        "remove" : emptyProps() ,
        "addBook" :   props<{ userBook: UserBook }>(),
        "addPlace" :   props<{ PlaceId: string }>(),
        "removePlace" : props<{ PlaceId: string }>(),
        },
    });