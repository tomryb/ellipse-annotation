import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { annotationsReducer } from './annotation/annotation.reducer';
import { AnnotationsEffects } from './annotation/annotation.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ annotations: annotationsReducer }),
    EffectsModule.forRoot([AnnotationsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
