import { createSelector, createFeatureSelector } from '@ngrx/store';

type Find = {location : string , price : string};
 
export const selectFind = createFeatureSelector<Find>('find');
 

export const selectLocation = createSelector(
    selectFind,
  (find) => find.location
);
export const selectPrice = createSelector(
    selectFind,
  (find) => find.price 
);