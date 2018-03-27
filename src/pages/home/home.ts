import {Component, ViewChild} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
// import {SuperTabsController} from "ionic2-super-tabs";
// import { SuperTabsController } from '../../ionic2-super-tabs/src';

@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  general='GeneralCategoryPage';
  entertainment='EntertainmentCategoryPage';
  health='HealthCategoryPage';
  sport='SportsCategoryPage';
  science='ScienceCategoryPage';
  technology='TechnologyCategoryPage';

  showIcons: boolean = true;
  showTitles: boolean = true;
  pageTitle: string = 'LiveNews';

  constructor(public navCtrl: NavController, private navParams: NavParams,) {
    // const type = navParams.get('type');
    // switch (type) {
    //   case 'icons-only':
    //     this.showTitles = false;
    //     this.pageTitle += ' - Icons only';
    //     break;

    //   case 'titles-only':
    //     this.showIcons = false;
    //     this.pageTitle += ' - Titles only';
    //     break;
    // }
  }

  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    // this.superTabsCtrl.enableTabSwipe('page3', false);
    // this.superTabsCtrl.enableTabsSwipe(false);

    // Test issue #122
    // setTimeout(() => {
    //   this.superTabs.slideTo(4);
    // }, 2000);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
