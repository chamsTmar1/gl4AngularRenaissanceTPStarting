import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddCvState } from './cv.state';
export const selectAddCv = createFeatureSelector<AddCvState>('addCv');
export const selectCv = createSelector(selectAddCv, (state) => state.cv);