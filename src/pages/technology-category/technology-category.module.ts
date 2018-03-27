import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnologyCategoryPage } from './technology-category';

@NgModule({
  declarations: [
    TechnologyCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnologyCategoryPage),
  ],
})
export class TechnologyCategoryPageModule {}
