import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AllBusStopsPage } from '../all-bus-stops/all-bus-stops';
import { FavoritesPage } from '../favorites/favorites';
import { CalculateFarePage } from '../calculate-fare/calculate-fare';
import { StopMapPage } from '../stop-map/stop-map';
import { NewsPage } from '../news/news';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any;

  constructor(public navCtrl: NavController, public http: Http) {

  }

  test()
  {
    this.http.get('https://data.smartdublin.ie/cgi-bin/rtpi/realtimebusinformation?stopid=7602&format=json')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(data);
        });
       // http://[rtpiserver]/busstopinformation?stopid=[stopid]&stopname=[stopname]&format=[json]
  }

  goToAllBusStopsPage()
  {
    this.navCtrl.push(AllBusStopsPage);
  }

  goToFavoritesPage()
  {
    this.navCtrl.push(FavoritesPage);
  }

  goToCalculateFare()
  {
    this.navCtrl.push(CalculateFarePage);
  }

  goToMap()
  {
    this.navCtrl.push(StopMapPage);
  }

  goToNews()
  {
    this.navCtrl.push(NewsPage);
  }


}
