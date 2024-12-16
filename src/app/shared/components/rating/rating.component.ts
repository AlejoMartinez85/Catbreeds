import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RatingComponent  {
  /**
   *
   */
  ratingValue = signal<number>(0);

  @Input() set setRatingValue(currentValue: number) {
    this.ratingValue.set(currentValue);
  }
  constructor() { }

}
