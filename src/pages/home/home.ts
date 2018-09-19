import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

import { AllBusStopsPage } from '../all-bus-stops/all-bus-stops';
import { FavoritesPage } from '../favorites/favorites';
import { CalculateFarePage } from '../calculate-fare/calculate-fare';
import { StopMapPage } from '../stop-map/stop-map';
import { NewsPage } from '../news/news';
import { AllRoutesPage } from '../all-routes/all-routes';
import { ViewBusStopPage } from '../view-bus-stop/view-bus-stop';

import { BusStopsProvider } from '../../providers/bus-stops/bus-stops';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any;

  closestStops = [];

  canGetLocation: any = true;
  currentLat;
  currentLng;

  searching: any = false;
  //resultsFound: any = true;

  constructor(public navCtrl: NavController, public http: Http, private geo: Geolocation, public busData: BusStopsProvider) {

    this.searching = true;

    this.geo.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLng = resp.coords.longitude;
      console.log("Users lat: " + this.currentLat);
      console.log("Users lng: " + this.currentLng);
      this.distance();
     }).catch((error) => {
       console.log('Error getting location', error);
       this.canGetLocation = false;
     });

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

  goToAllRoutesPage()
  {
    this.navCtrl.push(AllRoutesPage);
  }

  distance()
  {
    //let closestStop = this.busData.compareDistance(this.currentLat, this.currentLng);
    this.closestStops = this.busData.compareDistance(this.currentLat, this.currentLng);
    //this.closestStops.push(closestStop);
    //onsole.log("Closest Stop is: " + closestStop.fullname);
    console.log("Operators: " + this.closestStops[0].operators[0]);
    this.searching = false;
  }

  goToBusStopPage(stopId, fullname, operators, latitude, longitude)
  {
    console.log("StopId: " + stopId);
    console.log("fullname: " + fullname);
    console.log("operators: " + operators[0].routes);

    this.navCtrl.push(ViewBusStopPage, {stopid: stopId, fullname: fullname, operators: operators[0].routes, latitude: latitude, longitude: longitude});
  }


}
