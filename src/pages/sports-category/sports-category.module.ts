import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SportsCategoryPage } from './sports-category';

@NgModule({
  declarations: [
    SportsCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SportsCategoryPage),
  ],
})
export class SportsCategoryPageModule {}
