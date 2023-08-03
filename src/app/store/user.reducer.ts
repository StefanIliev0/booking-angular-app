import { createReducer, on } from '@ngrx/store';


import { UsersActions} from './user.actions';
import { User } from '../types/User';
import { Place } from '../types/Place';



export const initialState : User | any = {} ;

export const userReducer = createReducer(
  initialState,
  on(UsersActions.add , (_state , {user}) => user), 
  on(UsersActions.remove, (_state) => initialState ),
  on(UsersActions.addBook , (_state , {userBook}) => ({..._state , books : [..._state.books , userBook]})), 
  on(UsersActions.addPlace , (_state , {PlaceId}) => ({..._state , places : [..._state.places , PlaceId]})),
  on(UsersActions.removePlace , (_state , {PlaceId}) => ({..._state , places : _state.places.filter((x : Place) => x._id !== PlaceId)})),
  on(UsersActions.updateUser , (_state , {userInfo}) => ({... _state , ...userInfo}))
);
