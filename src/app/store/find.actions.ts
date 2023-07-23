import { createActionGroup , props } from "@ngrx/store";


export const FindActions = createActionGroup({
    source: 'Find',
    events : {
        "replaceLocation" : props<{ location: string }>(),
        "replacePrice" : props<{ price: string }>(),
        },
    });