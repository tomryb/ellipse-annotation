import { createAction, props } from '@ngrx/store';
import { Annotation } from './annotation.model';

export const DrawImageAndAnnotationsButtonClicked = createAction('[Annotations] Draw Image and Annotations Button Clicked');
export const LoadImageSuccess = createAction('[Annotations] Load Image Success', props<{ imageSrc: string }>());
export const LoadImageError = createAction('[Annotations] Load Image Error', props<{ error: any }>());
export const LoadAnnotationsSuccess = createAction('[Annotations] Load Annotations Success', props<{ annotations: Annotation[] }>());
export const LoadAnnotationsError = createAction('[Annotations] Load Annotations Error', props<{ error: any }>());
