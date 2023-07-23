import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../types/User'; 
 
export const selectUser = createFeatureSelector<User>('user');
 

export const selectIsAuth = createSelector(
    selectUser,
  (user) => {
        if(user._id){
            return true
        }else{
            return false
        }
  }
);
export const selectUserId = createSelector(
    selectUser,
  (user) => {
        if(user._id){
            return user._id
        }else{
            return ""
        }
  }
);
export const selectUserBooks = createSelector(
    selectUser,
  (user) =>     user.books 
);
