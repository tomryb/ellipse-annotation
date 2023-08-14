import { createReducer, on } from '@ngrx/store';
import * as AnnotationsActions from './annotation.action';
import { Annotation } from './annotation.model';

export interface State {
  annotations: Annotation[];
  imageSrc: string;
  error: any;
}

const initialState: State = {
  annotations: [],
  imageSrc: '',
  error: null,
};

export const annotationsReducer = createReducer(
  initialState,
  on(AnnotationsActions.LoadImageSuccess, (state, { imageSrc }) => ({ ...state, imageSrc })),
  on(AnnotationsActions.LoadImageError, (state, { error }) => ({ ...state, error })),
  on(AnnotationsActions.LoadAnnotationsSuccess, (state, { annotations }) => {
    return { ...state, annotations };
  }),
  on(AnnotationsActions.LoadAnnotationsError, (state, { error }) => ({ ...state, error })),
);
