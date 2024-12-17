import { Component, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { CatService } from '../../shared/services/cat.service';
import { Cat, CurrentCatListData } from '../../shared/interfaces/cat.interface';
import { IonContent, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatCardComponent } from '../../shared/components/cat-card/cat-card.component';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatCardComponent,
    InputSearchComponent
  ]
})
export class HomePage implements OnInit, OnDestroy {
  /**
   * variables for save cat list information
   */
  catList = signal<Cat[]>([]);
  catListBakcup = signal<Cat[]>([]);
  /**
   * variables for do pagination
   */
  currentCatPage: number = 0;
  hasMoreData: boolean = true;
  /**
   * variable for show and hide button scroll up
   */
  showScrollButton: boolean = false;
  scrollPercentage: number = 70;
  /**
   * variable for show and hide skeleton screen
   */
  isLoadingSK = signal<boolean>(true);
  skeletonList = signal<any[]>([{}, {}]);
  isToastOpen: boolean = false;


  @ViewChild(IonContent, { static: true }) mainContent: IonContent | undefined
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
   * function to open or close the feedback toast for errors
   * @param isOpen
   */
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  /**
   * Function to validate when the component is
   * loaded if local data is available or if it is
   * necessary to consume the API.
   */
  validateExistingData(): void {
    const currentCatList: CurrentCatListData = this.catService.listCat;
    if (currentCatList.catList.length > 0) {
      this.catList.set(currentCatList.catList);
      this.catListBakcup.set(currentCatList.catList);
      this.currentCatPage = currentCatList.page;
    } else {
      this.isLoadingSK.set(true);
      this.getInitialCatList();
    }
  }
  /**
   * Function used to query the cat API progressively
   * with the currentPage parameter.
   *
    It is also used to update the infinite scroll event.
   * @param event
   */
  getInitialCatList(event?: any): void {
    this.catService.getCatList(this.currentCatPage).subscribe({
      next: (response: Cat[]) => {
        if (response.length > 0) {
          this.currentCatPage++;
          this.catList.update(currentData => [...currentData, ...response]);
          this.catListBakcup.set(this.catList());
        } else {
          this.hasMoreData = false;
        }
        /**
         * for manage the current infinite scroll state
        */
        if (event) {
          event.target.complete();
        }
      },
      error: (error: any) => {
        console.log('@ErrroGetCatList: ', error);
        this.setOpen(true);
      },
      complete: () => {
        this.isLoadingSK.set(false);
      }
    });
  }
  /**
   *  Function that serves as receiver of the output
   *  event of the component searchinput and obtains
   * the value to search.
   * @param event
   */
  searchQuery(event: string): void {
    if (event === '') {
      /**
       * cuando es vacio eso quiere decir que debemos de traer todo de nuevo
       */
      this.catList.set(this.catListBakcup());
      if (this.currentCatPage > 0) {
        this.hasMoreData = true;
      }
    } else {
      /**
       * vamos a filtrar con lo que trajo haber que se encuentra
       */
      this.catList.set(this.returnValueFiltered(event));
      this.hasMoreData = false;
      if (this.catList().length === 0) {
        this.isLoadingSK.set(true);
        /**
        * when we don't find them in the local
        * we are going to consult all the api and search locally, if it doesn't have them
        * stored there then we show the feedback of not found
        */
        this.catService.getAllCatList().subscribe({
          next: (response: Cat[]) => {
            if (response.length) {
              this.catListBakcup.set(response);
              this.catList.set(this.returnValueFiltered(event));
            }
          },
          error: (error: any) => {
            console.log('@ErrroGetAllCatList: ', error);
            this.setOpen(true);
          },
          complete: () => {
            this.isLoadingSK.set(false);
          }
        });
      }
    }
  }
  /**
   *  Function that centralizes the action of
   *  filtering on the current list of cats by means
   *  of the property name vs. what was typed in the search input
   * @param query
   * @returns
   */
  returnValueFiltered(query: string): Cat[] | any[] {
    return this.catList().filter((cat) => cat.name.toLowerCase().indexOf(query) > -1);
  }
  /**
   *  Function that emulates the native refresh
   *  event and allows loading information without
   *  reloading the app.
   * @param event
   */
  handleRefresh(event: any) {
    setTimeout(() => {
      this.isLoadingSK.set(true);
      this.catService.getCatList(0).subscribe({
        next: (response: Cat[]) => {
          if (response.length > 0) {
            this.currentCatPage++;
            this.catList.set(response);
            this.catListBakcup.set(this.catList());
          }
          this.isLoadingSK.set(false);
          event.target.complete();
        },
        error: (error: any) => {
          console.log('@ErrroGetCatList handleRefresh: ', error);
          this.setOpen(true);
        },
        complete: () => {
          this.isLoadingSK.set(false);
          event.target.complete();
        }
      })
    }, 1000);
  }
  /**
   * Function that captures the event of infinitescroll
   * @param event
   */
  onIonInfinite(event: any): void {
    if (this.hasMoreData) {
      this.getInitialCatList(event);
    } else {
      event.target.complete();
    }
  }
  /**
   * Function that allows me to capture the events
   * triggered in the main component in order to know
   * when the scrollup button should be displayed.
   * @param event
   */
  async onScroll(event: any): Promise<void> {
    /**
     *  ------ calculate scroll percentage ----------
     */
    /**
     * main scroll event
     */
    const mainContent = event.target;
    const scrollElement = await mainContent.getScrollElement();
    /**
     *  totalHeigh == total height of container
     *  currentScroll == current total height of scroll
     * viewportHeight == viewport height
     */
    const totalHeight = scrollElement.scrollHeight;
    const currentScroll = scrollElement.scrollTop;
    const viewportHeight = mainContent.offsetHeight;
    /**
     * Calculate the scroll percentage
     */
    const scrollPercentage = (currentScroll / (totalHeight - viewportHeight)) * 100;
    this.showScrollButton = scrollPercentage >= 70;
  }
  /**
   * Function to scroll up to the
   * beginning of the container
   */
  scrollUp(): void {
    this.mainContent?.scrollToTop(400);
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
