import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntertainmentCategoryPage } from './entertainment-category';

@NgModule({
  declarations: [
    EntertainmentCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(EntertainmentCategoryPage),
  ],
})
export class EntertainmentCategoryPageModule {}
