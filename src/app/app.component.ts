import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AnnotationsActions from './annotation/annotation.action';
import { State } from './annotation/annotation.reducer';
import { Annotation } from './annotation/annotation.model';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <canvas #canvas width="512" height="512"></canvas>
      <button (click)="drawAnnotations()">Draw Annotations</button>
    </div>
  `,
  styles: []
})
export class AppComponent {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private store: Store<State>) { }

  drawAnnotations() {
    this.store.dispatch(AnnotationsActions.DrawImageAndAnnotationsButtonClicked());
    this.store.select(state => state.annotations)
      .subscribe(annotations => {
        this.renderAnnotations(annotations);
      });
  }

  renderAnnotations(annotations: Annotation[]) {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Canvas context is null.");
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = 'https://image.dummyjson.com/512x512/';

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;

      annotations.forEach(annotation => {
        ctx.beginPath();
        ctx.ellipse(annotation.x, annotation.y, annotation.radiusX, annotation.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
      });
    };
  }

}
