import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { User } from "../types/User";


export const UsersActions = createActionGroup({
    source: 'Users',
    events : {
        "add" : props<{ user: User }>(),
        "remove" : emptyProps()  
        },
    });