import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Place } from '../types/Place';
 
export const selectPlace = createFeatureSelector<Place>('place');
 

export const selectPics = createSelector(
    selectPlace,
  (place) => place.images 
);
export const selectRate = createSelector(
  selectPlace,
(place) => place.rating
);
export const selectBooks = createSelector(
  selectPlace,
(place) => place.books
);
export const selectComments = createSelector(
  selectPlace,
(place) => place.comments
);