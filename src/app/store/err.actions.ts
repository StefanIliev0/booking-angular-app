import { createActionGroup , props , emptyProps} from "@ngrx/store";


export const ErrActions = createActionGroup({
    source: 'Err',
    events : {
        "add" : props<{ err: string }>(),
        "remove" : emptyProps()  
        },
    });