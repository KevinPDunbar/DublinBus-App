import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as xml2js from 'xml2js';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',


}) 
export class NewsPage{

  jsonData;
  newsItems = [{}];

  visibleState = 'visible';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');

    this.getNews();
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
        this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';

    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

  getNews()
  {
    console.log("Getting news..");

    let jsonClone = this.jsonData
    let itemClone = this.newsItems;

    this.http.get('http://dublinbus.ie/templates/public/routeplannerservice/newshandler.ashx?pageid=27')
        .map(res => {
          xml2js.parseString( res.text(), function (err, result) {
          console.dir(result); // Prints JSON object!
          jsonClone = result;
          for(let i=0; i<jsonClone.xml.channel[0].item.length; i++)
          {
            console.log(jsonClone.xml.channel[0].item[i]);
            let title = jsonClone.xml.channel[0].item[i].title;
            let date = jsonClone.xml.channel[0].item[i].pubDate;
            let description = jsonClone.xml.channel[0].item[i].description;
            let icon = 'ios-add-circle-outline'
            let showDetails = false;
            let visibleState = false;
            itemClone.push({title: title, date: date, description: description, icon: icon, showDetails: showDetails, visibleState: visibleState});
            
          }
      });
    })
    .subscribe(data => { 
        console.log(jsonClone.xml.channel[0].item);  
        
        // Real Data => jsonClone.xml.channel[0].item
    });
  }


} 
