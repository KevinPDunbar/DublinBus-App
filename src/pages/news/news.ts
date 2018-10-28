import { Component, trigger, state, style, animate, transition } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import * as xml2js from 'xml2js';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  styles:[
    `
    .item-block{
      min-height: 0;
      transition: 0.09s all linear;
    }
    `
    ],
    animations: [
      trigger('expand', [
        state('true', style({ height: '45px' })),
        state('false', style({ height: '0'})),
        transition('void => *', animate('0s')),
        transition('* <=> *', animate('250ms ease-in-out'))
      ])
    ]

}) 
export class NewsPage{

  jsonData;
  newsItems = [];
  visibleState = 'visible';
  active: boolean;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.active=false;
    this.searching = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getNews();
  }


  toggle() 
   {
   this.active = !this.active
  }

  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'md-add-circle';
        this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';

    } else {
        data.showDetails = true;
        data.icon = 'md-remove-circle';
    }
  }

  getNews()
  {
    console.log("Getting news..");

    let jsonClone = this.jsonData
    let itemClone = this.newsItems;

    this.http.get('http://dublinbus.ie/templates/public/routeplannerservice/newshandler.ashx?pageid=27')
        .map(res => {
          this.searching = false;
          xml2js.parseString( res.text(), function (err, result) {
          console.dir(result); // Prints JSON object!
          jsonClone = result;
          for(let i=0; i<jsonClone.xml.channel[0].item.length; i++)
          {
            console.log(jsonClone.xml.channel[0].item[i]);
            let title = jsonClone.xml.channel[0].item[i].title;
            let date = jsonClone.xml.channel[0].item[i].pubDate;
            let description = jsonClone.xml.channel[0].item[i].description.toString();

            let texts = description.replace(/<a\b[^>]*>(.*?)<\/a>/g,"(on dublinbus.ie)");

            let fullDate = new Date(date).toLocaleString("en-GB");
            let ddmmyyyy = fullDate.split(',')[0];

            let icon = 'md-add-circle'
            let showDetails = false;
            let visibleState = false;
            itemClone.push({title: title, date: ddmmyyyy, description: texts, icon: icon, showDetails: showDetails, visibleState: visibleState});
            
          }
      });
    })
    .subscribe(data => {  
        // Real Data => jsonClone.xml.channel[0].item
    });
  }


} 
