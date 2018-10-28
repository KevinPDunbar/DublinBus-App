import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, HttpModule } from '@angular/http';
import {RouteViewPage } from '../route-view/route-view';

/**
 * Generated class for the RouteSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-select',
  templateUrl: 'route-select.html',
})
export class RouteSelectPage {

  routeOptions = [];

  route;
  data;

  searching: any = false;
  resultsFound: any = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

    this.route =  this.navParams.get('route'); 
    console.log("The passed in route: " + this.route); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteSelectPage');
    this.searching = true;
    this.getRouteOptions();
  }

  getRouteOptions()
  {
    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/routeinformation?routeid=' + this.route + '&operator=bac&format=json')
        .map(res => res.json())
        .subscribe(data => {
          this.searching = false;
          if(data.results.length < 1)
          {
            this.resultsFound = false;
          }
          else
          {
            this.resultsFound = true;
            for(let i=0; i<data.results.length; i++)
            {
              this.routeOptions.push(data.results[i]);
            }
          }
        });
  }

  goToRouteView(origin, destination, stops)
  {
    this.navCtrl.push(RouteViewPage, {origin: origin, destination: destination, stops: stops, route: this.route});
  }

}
