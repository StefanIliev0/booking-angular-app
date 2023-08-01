import { createActionGroup , props , emptyProps} from "@ngrx/store";
import { Place } from "../types/Place";
import { Rate } from "../types/Rate";
import { Book } from "../types/Book";


export const PlaceActions = createActionGroup({
    source: "place",
    events : {
        "add" : props<{ place: Place }>(),
        "remove" : emptyProps(),
        "addRate" : props<{rate : Rate}> () ,
        "addBook" : props<{book : Book}> () ,
        "addComment" : props<{comment : Comment}>() ,
        "removeComment" : props<{commentId : string}>() ,
        },
    });