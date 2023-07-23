import { createReducer, on } from '@ngrx/store';


import { UsersActions} from './user.actions';
import { User } from '../types/User';



export const initialState : User | {} = {} ;

export const userReducer = createReducer(
  initialState,
  on(UsersActions.add , (_state , {user}) => user), 
  on(UsersActions.remove, (_state) => initialState ),
);
