import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthCategoryPage } from './health-category';

@NgModule({
  declarations: [
    HealthCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthCategoryPage),
  ],
})
export class HealthCategoryPageModule {}
