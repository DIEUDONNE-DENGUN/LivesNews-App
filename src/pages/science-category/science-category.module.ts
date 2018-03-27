import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScienceCategoryPage } from './science-category';

@NgModule({
  declarations: [
    ScienceCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ScienceCategoryPage),
  ],
})
export class ScienceCategoryPageModule {}
