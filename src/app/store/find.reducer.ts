import { createReducer, on } from '@ngrx/store';


import { FindActions } from './find.actions'; 



export const initialState : {location : string , price : string} = {location : "" , price : ""} ;

export const FindReducer = createReducer(
  initialState,
  on(FindActions.replaceLocation , (_state , {location}) => ({..._state , location})), 
  on(FindActions.replacePrice, (_state , {price}) => ({..._state , price})), 
);
