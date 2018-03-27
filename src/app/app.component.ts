import {Component, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
// import { PartialHomePage } from "../pages/partial-home/partial-home";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  rootParams: any;

  menuItems: any[] = [
    {
      name: 'News Categories',
      page: 'HomePage',
      
    },
    {
      name: 'Saved Favorite News',
      page: 'FavoritePage',
     
    },
    {
      name: 'About',
      page: 'AboutPage',
      
    }
  ];

  constructor(platform: Platform, splashScreen: SplashScreen, statusBar: StatusBar) {
    this.rootPage = this.menuItems[0].page;
    this.rootParams = this.menuItems[0].params;
    platform.ready().then(() => {
      splashScreen.hide();
      statusBar.backgroundColorByHexString('#7A1EA1');
    });
  }

  openPage(page) {
    this.nav.setRoot(page.page, page.params);
  }

}
