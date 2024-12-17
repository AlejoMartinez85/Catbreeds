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
   * signal variables
   */
  ratingValue = signal<number>(0);
  propertyLabel = signal<string>('');
  /**
   * Inputs functions
   */
  @Input() set setRatingValue(currentValue: number) {
    this.ratingValue.set(currentValue);
  }
  @Input() set setPropertyLabelValue(currentValue: string) {
    this.propertyLabel.set(currentValue);
  }
  constructor() { }

}
