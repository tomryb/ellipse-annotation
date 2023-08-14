import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AnnotationsActions from './annotation.action';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AnnotationsEffects {

  constructor(private actions$: Actions, private http: HttpClient) { }

  loadImage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AnnotationsActions.DrawImageAndAnnotationsButtonClicked),
    switchMap(() =>
      this.http.get('https://image.dummyjson.com/512x512/101010', { responseType: 'blob' }).pipe(
        map(response => {
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(response);
          return AnnotationsActions.LoadImageSuccess({ imageSrc: imageUrl });
        }),
        catchError((error) => of(AnnotationsActions.LoadImageError({ error })))
      )
    )
  )
);

  loadAnnotations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.DrawImageAndAnnotationsButtonClicked),
      switchMap(() =>
        this.http.get<any>('https://dummyjson.com/http/200/[{"id":"a1","radiusX":20,"radiusY":25,"x":50,"y":60}]')
          .pipe(
            map(response => JSON.parse(response.message)),
            map((annotations) => {
              return AnnotationsActions.LoadAnnotationsSuccess({ annotations });
            }),
            catchError((error) => {
              return of(AnnotationsActions.LoadAnnotationsError({ error }));
            })
          )
      )
    )
  );

}
