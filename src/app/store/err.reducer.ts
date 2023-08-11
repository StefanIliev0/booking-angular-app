import { createReducer, on } from '@ngrx/store';


import { ErrActions } from './err.actions'; 



export const initialState : string = "" ;

export const ErrReducer = createReducer(
  initialState,
  on(ErrActions.add , (_state , {err}) => {return err}), 
  on(ErrActions.remove, (_state) => initialState ),
);
