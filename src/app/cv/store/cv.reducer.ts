import { createReducer, on } from '@ngrx/store';
import { initialAddCvState, AddCvState } from  './cv.state';
import * as CvActions from './cv.actions';  
export const addCvReducer = createReducer(
  initialAddCvState,
  on(CvActions.updateCv, (state, { cv }) => ({
    ...state,
    cv: cv,  
  }))
);