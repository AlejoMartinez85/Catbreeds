import { Component, OnInit, signal } from '@angular/core';
import { CatService } from '../shared/services/cat.service';
import { Cat } from '../shared/interfaces/cat.interface';
import { Router } from '@angular/router';
import { BASES_ROUTE } from '../shared/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  /**
   * variables
   */
  catList = signal<Cat[]>([]);
  catListBakcup = signal<Cat[]>([]);
  /**
   *
   * @param catService
   */
  constructor(
    private catService: CatService
  ) {}

  ngOnInit(): void {
    this.getInitialCatList();
  }
  /**
   *  function for get initial cat list data and set in catList
   */
  getInitialCatList(): void {
    this.catService.getCatList().subscribe((response: Cat[]) => {
      this.catList.set(response);
      console.log('catList data: ', this.catList());
    });
  }

}
