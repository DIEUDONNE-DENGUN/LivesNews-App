import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing';


@IonicPage()
@Component({
  selector: 'page-technology-category',
  templateUrl: 'technology-category.html',
})
export class TechnologyCategoryPage {

  cards: any;
  news_feeds:any;
  news_feeds_cat_2:any;   //handle the display of the 2 category of news list
  news_feeds_cat_3:any;  //handle the display of the 3 category of news list
  news_feeds_cat_4:any;  //handle the display of the 4 category of news list
  no_news_feeds:boolean;
  constructor(public navCtrl: NavController,public social_sharing:SocialSharing, public news_provider:NewsProvider, public loader:LoadingController) {
    this.no_news_feeds=false;
    moment.locale('en');
  }

   ionViewDidEnter(){
    
    //get top technology headlines from News.org API service
     this.getTopHeadLinesTechnology();
   }

    /*
     @Author:Dieudonne Dengun
     @Date:26/03/2018
     @Description: Handle the image load error for feed-image

   */
  onFeedImageError(news, index):void{
    // image.onerror = "http://placehold.it/500x200";
    let src = "https://avatars.io/twitter/news";
    if(this.news_feeds.indexOf(news) >-1){
       
       this.news_feeds[index].urlToImage=src;
    }else if(this.news_feeds_cat_2.indexOf(news) >-1){
          
      this.news_feeds_cat_2[index].urlToImage=src;
    }else if(this.news_feeds_cat_3.indexOf(news) >-1){

      this.news_feeds_cat_3[index].urlToImage=src;
    }else{

      this.news_feeds_cat_4[index].urlToImage=src;
    }
   }

    /*
   @Author:Dieudonne Dengun
   @Date:26/03/2018
   @Description: Handle the image load error for news source logo

 */
onFeedSourceImageError(news,index):void{

  // image.src = "https://avatars.io/twitter/news";
  let src = "https://avatars.io/twitter/news";
  if(this.news_feeds.indexOf(news) >-1){
     
     this.news_feeds[index].source.feed_source_avatar=src;
  }else if(this.news_feeds_cat_2.indexOf(news) >-1){
        
    this.news_feeds_cat_2[index].source.feed_source_avatar=src;

  }else if(this.news_feeds_cat_3.indexOf(news) >-1){

    this.news_feeds_cat_3[index].source.feed_source_avatar=src;
  }else{

    this.news_feeds_cat_4[index].source.feed_source_avatar=src;
  }
 }

 /*
   @Author:Dieudonne Dengun
   @Date: 26/03/2018
   @Description:Handle the click share action for a news cast. Display share actionsheet to various social networks
  */
 shareNewsActionSheet(news) {

  let title = news.title;
  let url = news.url;
  let description = news.description;
  let news_default_image = news.urlToImage;
  let content = description.concat(" \n\n Shared from LiveNews App !");

  this.news_provider.showActionSheeet([
    {


      text: 'Share on Facebook',
      icon: 'logo-facebook',
      handler: () => {

        this.social_sharing.shareViaFacebook(content, news_default_image, url)
      }
    },
    {
      text: 'Share on Whatsapp',
      icon: 'logo-whatsapp',
      handler: () => {
        this.social_sharing.shareViaWhatsApp(content, news_default_image, url);
      }
    },
    {
      text: 'Share on Twitter',
      icon: 'logo-twitter',
      handler: () => {

        this.social_sharing.shareViaTwitter(content, news_default_image, url);
      }
    },
    {
      text: "Share News' Link",
      icon: 'share',
      handler: () => {

        //share the news generally through any sharing appliactions which is supported
        this.social_sharing.share(content, title, null, url);
      }
    },
  ]);

}

/*
  @Author:Dieudonne Dengun
  @Date:26/03/2018
  @Description:Handle clik event of like button or make favorite
*/
 showNewsDetailsURL(url){

   //open url from the browser's service
     this.news_provider.openNewsUrlPage(url);
 }

   /*
     @Author:Diedonne Dengun
     @Date:22/03/2018
     @Description: Get general top headlines

   */

   getTopHeadLinesTechnology():void{

    //initiate loader here
    this.news_provider.showLoader("Loading top technology headlines..");
    // let loadingCtrl=this.loader.create({content:"Loading top technology headlines..."});
    // loadingCtrl.present();
     this.news_provider.getTopHeadlinesTechnology()
     .subscribe(data=>{

         if(data){
          //  this.loader.dismiss();  

           let total_feeds=data.totalResults;

           //set abitrary categories to display and handle dynamic layouting of feeds
           let categories=[1,2];
          
            //chec if there were news casts
            if(total_feeds >0){

               let feed_list=data.articles;
               for (let feed of feed_list) {
                
                var i = 0, strLength = feed.source.name.length;
                let feed_source_name=feed.source.name;

                //loop through the source name to remove whitespaces to general the avatar for the source
                for(i; i < strLength; i++) {
                  feed_source_name=feed_source_name.replace(" ", "");
                }

                //formate the published date by remove unknown characters
                let publishedDate=feed.publishedAt;
                let publishedDateFormat="";
                
                if(publishedDate){
                   
                  publishedDate=publishedDate.replace("Z","");
                   publishedDate=publishedDate.replace("T"," ");
                  
                   
                   feed.publishedAt=moment.utc(publishedDate).fromNow();
                }

                //add a new field to the source array
                 feed.source.feed_source_avatar="https://avatars.io/facebook/"+feed_source_name;

                 if(feed.description){
                 feed.description=feed.description.substring(0, 100);
                 }else{

                   feed.description="";
                 }
                 
               }

              //filter and sort the feeds elements into catgeories here
               
              this.news_feeds_cat_2=feed_list.slice(2,6);
              this.news_feeds_cat_3=feed_list.slice(6,9);
              this.news_feeds_cat_4=feed_list.slice(9);
              this.news_feeds=feed_list.slice(0,2);
              console.log(this.news_feeds);
            }else{

              this.no_news_feeds=true;
            }

         }
         this.news_provider.closeLoader();
         
     },(error) =>{
       
      
      let message=error.error.message;
      this.news_provider.closeLoader();

      if(message === undefined){

        //this means the user is currently offline to perform the said operation
        this.news_provider.showToastMessage("You are currently offline.Please check your internet connection to continue","bottom",4000);
      }
     });
   }
  

}
