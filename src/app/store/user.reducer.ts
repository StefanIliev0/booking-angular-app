import { createReducer, on } from '@ngrx/store';


import { UsersActions} from './user.actions';
import { User } from '../types/User';
import { Place } from '../types/Place';
import { Mesage } from '../types/Mesage';



export const initialState : User | any = {} ;

export const userReducer = createReducer(
  initialState,
  on(UsersActions.add , (_state , {user}) => user), 
  on(UsersActions.remove, (_state) => initialState ),
  on(UsersActions.addBook , (_state , {userBook}) => ({..._state , books : [..._state.books , userBook]})), 
  on(UsersActions.addPlace , (_state , {PlaceId}) => ({..._state , places : [..._state.places , PlaceId]})),
  on(UsersActions.removePlace , (_state , {PlaceId}) => ({..._state , places : _state.places.filter((x : Place) => x._id !== PlaceId)})),
  on(UsersActions.updateUser , (_state , {userInfo}) => ({... _state , ...userInfo})),
  on(UsersActions.addConv , (_state , {message}) => ({..._state , mesages : [..._state.mesages , message]})),
  on(UsersActions.addMessage , (state , {message , messageId , userId }) =>{
    let messages = [...state.mesages] as Mesage[] ; 
    let thisMessage = messages.filter(x => x._id == messageId)[0];
    let otherMessages = messages.filter(x => x._id != messageId);
    let mess =  {user : userId , mesage : message , read : true }
     return {...state , mesages :[...otherMessages , {...thisMessage , mesages :[...thisMessage.mesages , mess]} ]}}),
  on(UsersActions.updateUserData , (_state , {mesages , books }) => ({..._state , mesages , books})),
  on(UsersActions.readMessages , (_state , { messageId }) => {
    let messages = [..._state.mesages] as Mesage[] ; 
    let thisMessage = messages.filter(x => x._id == messageId)[0];
    let otherMessages = messages.filter(x => x._id != messageId);
    thisMessage.mesages = thisMessage.mesages.map(x =>({...x , read : true}))
     return {..._state , mesages :[ thisMessage, ...otherMessages ]}}),
); 
