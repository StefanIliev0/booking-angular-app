import { createReducer, on } from '@ngrx/store';


import { PlaceActions } from './place.actions'; 
import { Place } from '../types/Place';
import { Comment } from '../types/Comment';



export const initialState : any = {} ;

export const placeReducer = createReducer(
  initialState,
  on(PlaceActions.add , (_state , {place}) => place), 
  on(PlaceActions.remove, (_state) => initialState ),
  on(PlaceActions.addRate, (state  , {rate}) => ({...state , rating : [...state?.["rating"] , rate ]  })),
  on(PlaceActions.addBook, (state  , {book}) => ({...state , books : [...state?.["books"] , book ]  })),
  on(PlaceActions.addComment, (state  , {comment}) => ({...state , comments : [...state?.["comments"] , comment ]  })),
  on(PlaceActions.removeComment , (state , {commentId}) => {
    let newCom  = state.comments.filter((x : Comment) => x._id != commentId); 
    return { ...state , comments : newCom }
  })

);
