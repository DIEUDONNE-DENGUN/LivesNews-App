import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralCategoryPage } from './general-category';

@NgModule({
  declarations: [
    GeneralCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralCategoryPage),
  ],
})
export class GeneralCategoryPageModule {}
