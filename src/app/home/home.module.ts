import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CatCardComponent } from '../shared/components/cat-card/cat-card.component';
import { InputSearchComponent } from '../shared/components/input-search/input-search.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CatCardComponent,
    InputSearchComponent
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
