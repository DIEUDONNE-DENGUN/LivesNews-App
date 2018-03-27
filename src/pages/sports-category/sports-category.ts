import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';
import moment from 'moment';
/**
 * Generated class for the SportsCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sports-category',
  templateUrl: 'sports-category.html',
})
export class SportsCategoryPage {

  news_feeds: any;
  no_news_feeds: boolean;
  constructor(public navCtrl: NavController, public news_provider: NewsProvider, public loader: LoadingController) {
    this.no_news_feeds = false;
  }

  ionViewDidEnter() {

    //get top headlines under the sport category
    this.getTopHeadLinesSports();
  }


  /*
    @Author:Diedonne Dengun
    @Date:22/03/2018
    @Description: Get general top headlines

  */

  getTopHeadLinesSports(): void {

    //initiate loader here
    // this.news_provider.showLoader("Loading top headlines...");
    let loadingCtrl = this.loader.create({ content: "Loading sports news..." });
    loadingCtrl.present();
    this.news_provider.getTopHeadlinesSports()
      .subscribe(data => {

        if (data) {
          //  this.loader.dismiss();  

          let total_feeds = data.totalResults;

          //check if there news podcasts from the response
          if (total_feeds > 0) {

            //filter data to be rendered on html
            let feed_list = data.articles;
            for (let feed of feed_list) {

              var i = 0, strLength = feed.source.name.length;
              let feed_source_name = feed.source.name;

              //loop through the source name to remove whitespaces
              for (i; i < strLength; i++) {
                feed_source_name = feed_source_name.replace(" ", "");
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

              if (feed.description) {
                feed.description = feed.description.substring(0, 100);
              } else {

                feed.description = "";
              }

            }
            this.news_feeds = feed_list;
            console.log(feed_list);
          } else {

            this.no_news_feeds = true;
          }

        }
        loadingCtrl.dismiss();

      }, (error) => {

        loadingCtrl.dismiss();
      });
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
  }
 }

}
