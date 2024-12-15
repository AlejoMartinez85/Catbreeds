import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CatService } from '../shared/services/cat.service';
import { Cat, CurrentCatListData } from '../shared/interfaces/cat.interface';
import { Router } from '@angular/router';
import { BASES_ROUTE } from '../shared/constants/constants';
import { InfiniteScrollCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  /**
   * variables
   */
  catList = signal<Cat[]>([]);
  catListBakcup = signal<Cat[]>([]);
  currentCatPage: number = 0;
  hasMoreData: boolean = true;
  /**
   *
   * @param catService
   */
  constructor(
    private catService: CatService
  ) {}

  ngOnInit(): void {
    this.validateExistingData();
  }
  /**
   *
   */
  validateExistingData(): void {
    const currentCatList: CurrentCatListData = this.catService.listCat;
    console.log('currentCatList: ', currentCatList);
    if (currentCatList.catList.length > 0) {
      this.catList.set(currentCatList.catList);
      this.catListBakcup.set(currentCatList.catList);
      this.currentCatPage = currentCatList.page;
    } else {
      this.getInitialCatList();
    }
  }
  /**
   *  function for get initial cat list data and set in catList
   */
  getInitialCatList(event?: any): void {
    this.catService.getCatListV2(this.currentCatPage).subscribe((response: Cat[]) => {
      if (response.length > 0) {
        this.currentCatPage ++;
        this.catList.update(currentData => [...currentData, ...response]);
        console.log('catList data: ', this.catList());
        console.log('this.currentCatPage: ', this.currentCatPage);
      } else {
        this.hasMoreData = false;
      }

      if (event) {
        event.target.complete();
      }
    });
  }
  /**
   *
   * @param event
   */
  onIonInfinite(event: any): void {
    if (this.hasMoreData) {
      this.getInitialCatList(event);
      console.log('event infinite scroll: ', event);
    } else {
      event.target.complete();
    }
  }

  ngOnDestroy(): void {
    /**
     * The current list of cats is set to avoid multiple queries.
     */
    this.catService.setListCat = {
      catList: this.catList(),
      page: this.currentCatPage
    };
  }

}
