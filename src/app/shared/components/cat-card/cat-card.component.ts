import { Component, effect, Input, OnInit, signal } from '@angular/core';
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
  catCountryFlagCode: string = '';
  catIntelligence: number | any  = 0;
  /**
   * Input for set cat data
   */
  @Input() set setCat(value: Cat) {
    this.cat.set(value);
  }
  constructor(
    private catService: CatService,
    private router: Router) {

    effect(() => {
      const currentCat = this.cat();
        if (currentCat && currentCat.id !== '') {
          this.catCountryFlagCode = `fi fi-${currentCat.country_code.toLowerCase()}`;
          this.catIntelligence = this.cat()?.intelligence;
        }
      });
    }

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
    this.router.navigate([`${BASES_ROUTE.DETAIL}`, cat.id]);
  }


}
