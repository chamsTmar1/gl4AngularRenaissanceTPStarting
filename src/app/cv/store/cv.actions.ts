import { createAction, props } from '@ngrx/store';
import { Cv } from '../model/cv';
export const updateCv = createAction(
  '[Cv] Update CV',
  props<{ cv: Cv }>()
);