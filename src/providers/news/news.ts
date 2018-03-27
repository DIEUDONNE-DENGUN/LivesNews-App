import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController, LoadingController, ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserTab } from '@ionic-native/browser-tab';

@Injectable()
export class NewsProvider {

  public loading: any;
  country: String="us"; //hold on the default 
  base_url: String= "https://newsapi.org/v2/";   //hold base url of the news API 
  access_token: String= "902bf27e4c9540f6b851ad229e1457f0";  //hold acces token to News Api
  constructor(public http: HttpClient, public iab: InAppBrowser,public browserTab:BrowserTab,private actionSheetCtrl: ActionSheetController,public storage : Storage ,private alert: AlertController, private toast: ToastController, private loader: LoadingController) {
    
  }

   /*
   @Author: Dieudonne Dengun
   @Date: 09/01/2017
   @Description: Show  and close loading screen to a component

  */
 showLoader(message: string) {

  this.loading = this.loader.create({
    content: message
  });

  this.loading.present();
}

/*
 @Description: Close alert dialog
*/
closeLoader(){
  
  this.loading.dismiss();
}

/*
 @Author: Dieudonne Dengun
 @Date: 09/01/2017
 @Description: Show Toast message to the bottom of the screen
 @param : $message, $position //top, bottom and middle
 */

showToastMessage(message: string, position: string = "bottom", duration: number = 4000,class_name:string="toast-default") {

  let toast_message = this.toast.create({
    message: message,
    duration: duration,
    position: position,
    // dismissOnPageChange:true,
    // showCloseButton:true,
    // cssClass:class_name,

  });

  toast_message.present();
}

/*
 @Author: Dieudonne Dengun
 @Date: 09/01/2017
 @Description: Show Toast message to the bottom of the screen
 @param : $message
*/
showSimpleAlertDialog(title: string = "", msg: string = "") {

  let alert = this.alert.create({
    title: title,
    message: msg,
    buttons: ['OK']
  });
  alert.present();
}



/*
 @Author:Dieudonne Dengun
 @Date:26/03/2018
 @Description:Display actionsheet
*/
showActionSheeet(buttons: Array<any>) {
  buttons.push({
      icon:'close',
      text: 'Cancel',
      role: 'cancel',
  });

let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
  });

actionSheet.present();
}


/*
  @Author:Dieudonne Dengun
  @Date: 27/03/2018
  @Description: Open inappbrowser or browsertab if exist to view news details
*/
 openNewsUrlPage(url:string){

  this.browserTab.isAvailable()
          .then((isAvailable: boolean) => {

            //check if browsertab is supported or available for the device
            if (isAvailable) {
              
              this.browserTab.openUrl(url).then(success => {

                if (success) {
                  //this means the browser was successfully open
                }
              });

            } else {

              // open URL with InAppBrowser instead since browsertab not available
              
              this.iab.create(url, "_system", "location=true");


            }

          });
 }

/*
  @Dieudonne Dengun
  @Date:23/03/2018
  @Description: build Http headers

*/
public getRequestHeaders() : HttpHeaders{

  //Your API key is missing. Append this to the URL with the apiKey param, or use the x-api-key HTTP header.
  var headers = new HttpHeaders()
  .set("Accept", 'application/json')
  .set('Content-Type', 'application/json')
  .set('x-api-key', ''+ this.access_token);

  return headers;
}

 /*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get general headline news from API

  */
 getTopHeadlinesGeneral(): any{

  let base_url = this.base_url;

  return this.http.get(base_url + "top-headlines?category=general&country="+this.country,{headers: this.getRequestHeaders()});
}

 /*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get entertainment headline news from API

  */
 getTopHeadlinesEntertainment(): any{

  let base_url = this.base_url;
  
  return this.http.get(base_url +  "top-headlines?country="+this.country+"&category=entertainment",{headers: this.getRequestHeaders()});
}

/*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get health headline news from API

  */
 getTopHeadlinesHealth(): any{

  let base_url = this.base_url;
  
  return this.http.get(base_url + "top-headlines?country="+this.country+"&category=health",{headers: this.getRequestHeaders()});
}

 /*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get Sports headline news from API

  */
 getTopHeadlinesSports(): any{

  let base_url = this.base_url;
  
  return this.http.get(base_url +  "top-headlines?country="+this.country+"&category=sports",{headers: this.getRequestHeaders()});
}

 /*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get Science headline news from API

  */
 getTopHeadlinesScience(): any{
  
  let base_url = this.base_url;
  
  return this.http.get(base_url +  "top-headlines?country="+this.country+"&category=science",{headers: this.getRequestHeaders()});
}

/*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Get general headline news from API

  */
 getTopHeadlinesTechnology(): any{

  let base_url = this.base_url;
  
  return this.http.get(base_url +  "top-headlines?country="+this.country+"&category=technology",{headers: this.getRequestHeaders()});
}

/*
  @Author: Dieudonne Dengun
  @Date: 22/03/2018
  @Description: Persit User info to the local storage

  */

persistData(key: string, data) : void{
  this.storage.set(key, data);
}

}
