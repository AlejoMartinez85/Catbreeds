import { Component, Input, OnInit, signal } from '@angular/core';
import { Cat } from '../../interfaces/cat.interface';
import { CatService } from '../../services/cat.service';
import { Router } from '@angular/router';
import { BASES_ROUTE } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule ]
})
export class CatCardComponent {
  /**
   * variable for save the current cat data
   */
  cat = signal<Cat | null>(null);
  /**
   * Input for set cat data
   */
  @Input() set setCat(value: Cat) {
    this.cat.set(value);
  }
  constructor(
    private catService: CatService,
    private router: Router) { }

  /**
   *
   * @param cat
   */
  selectCat(cat: Cat | any): void {
    console.log('current cat Selected: ', cat);
    this.catService.setCurrentCat = cat;
    /**
     * navigate logic
     */
    this.router.navigateByUrl(`${BASES_ROUTE.DETAIL}/${cat.id}`);

  }

}
